const axios = require('axios')
const APP_ID = process.env.EDAMAN_ID
const API_KEY = process.env.EDAMAN_KEY
const DOMAIN = 'https://api.edamam.com'
require('dotenv').config()
const { Configuration, OpenAIApi } = require('openai')
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration)
const { GroceryList, Recipe, Ingredient, User } = require('../models')

const index = async (req, res) => {
  const { payload } = res.locals
  let user = await User.findById(payload.id)
  let groceryLists = await GroceryList.find({ user: user._id })
    .populate({
      path: 'recipes',
      populate: { path: 'ingredients.ingredient' }
    })
    .populate('ingredients.ingredient')
  res.send(groceryLists)
}

const create = async (req, res) => {
  const { payload } = res.locals
  let user = await User.findById(payload.id)
  try {
    let groceryList = await GroceryList.create({ user: user._id })
    res.send(groceryList)
  } catch (error) {
    console.log(error)
    res.status(401).send({ status: 'Error', msg: 'An error has occurred!' })
  }
}

const addRecipe = async (req, res) => {
  let recipe = await Recipe.findById(req.params.recipeId)
  try {
    let groceryList = await GroceryList.findById(req.params.groceryId)
    if (
      !groceryList.recipes
        .map((recipe) => recipe.toString())
        .includes(req.params.recipeId)
    ) {
      groceryList.recipes.push(recipe._id)
      await groceryList.save()
      return res.send(groceryList)
    }
    res.send('You already added that recipe to this grocery list!')
  } catch (error) {
    console.log(error)
    res.status(401).send({ status: 'Error', msg: 'An error has occurred!' })
  }
}

const remove = async (req, res) => {
  let groceryList = await GroceryList.findById(req.params.groceryId)
  let index = groceryList.recipes
    .map((recipe) => recipe.toString())
    .indexOf(req.params.recipeId)
  try {
    if (index !== -1) {
      groceryList.recipes.splice(index, 1)
      await groceryList.save()
      return res.send(groceryList)
    }
    res.send('Could not find that recipe in this grocery list')
  } catch (error) {
    console.log(error)
    res.status(401).send({ status: 'Error', msg: 'An error has occurred!' })
  }
}

const deleteGroceryList = async (req, res) => {
  try {
    await GroceryList.findByIdAndDelete(req.params.groceryId)
    res.send('Success')
  } catch (err) {
    console.log(error)
    res.status(401).send({ status: 'Error', msg: 'An error has occurred!' })
  }
}

const compile = async (req, res) => {
  let groceryList = await GroceryList.findById(req.params.groceryId).populate({
    path: 'recipes',
    populate: { path: 'ingredients.ingredient' }
  })
  groceryList.ingredients = []
  let ingredients = []
  try {
    groceryList.recipes.forEach((recipe) => {
      recipe.ingredients.forEach((ingredientObj) => {
        let index = ingredients.indexOf(ingredientObj.ingredient._id.toString())
        if (index === -1) {
          ingredients.push(ingredientObj.ingredient._id.toString())
          groceryList.ingredients.push(ingredientObj)
        } else {
          let currentValue = parseFloat(groceryList.ingredients[index].quantity)
          groceryList.ingredients[index].quantity =
            currentValue + parseFloat(ingredientObj.quantity)
        }
      })
    })
    await groceryList.save()
    res.send(groceryList)
  } catch (error) {
    console.log(error)
    res.status(401).send({ status: 'Error', msg: 'An error has occurred!' })
  }
}
const finished = async (req, res) => {
  let groceryList = await GroceryList.findById(req.params.groceryId)
  let ingredientIds = groceryList.ingredients.map((ingredient) =>
    ingredient._id.toString()
  )
  try {
    for (let i = 0; i < ingredientIds.length; i++) {
      if (req.body[ingredientIds[i]] !== undefined) {
        groceryList.ingredients[i].quantity = req.body[ingredientIds[i]]
      }
    }
    for (let i = groceryList.ingredients.length - 1; i >= 0; i--) {
      let quantity = groceryList.ingredients[i].quantity
      if (quantity === '0' || quantity === '') {
        groceryList.ingredients.splice(i, 1)
      }
    }
    groceryList.finished = true
    await groceryList.save()
    res.send(groceryList)
  } catch (error) {
    console.log(error)
    res.status(401).send({ status: 'Error', msg: 'An error has occurred!' })
  }
}

const suggestions = async (req, res) => {
  let groceryList = await GroceryList.findById(req.params.groceryId).populate(
    'ingredients.ingredient'
  )
  let ingredientStrings = []
  groceryList.ingredients.forEach((ingr) => {
    ingredientStrings.push(
      `${ingr.quantity} ${ingr.ingredient.measure} ${ingr.ingredient.name}`
    )
  })
  let prompt = 'Grocery list:' + ingredientStrings.join(', ')

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content:
          "Act as a nutritionist. When I provide you with a grocery list, list three specific foods not in the list that supplement nutrients that the list is is deficient in. Suggest a variety of different foods so the same ones aren't generated each time. Each suggestion should take the following format exactly:'Suggestion: *ingredient name here*, Reason: *reason here*.', and the reason should be kept brief. The response should be a single line with no line breaks."
      },
      {
        role: 'user',
        content: prompt
      }
    ],
    temperature: 1.5,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0
  })
  let formattedSuggestions = []
  try {
    let rawSuggestions = response.data.choices[0].message.content.split('.')
    for (let i = 0; i < 3; i++) {
      let suggestion = rawSuggestions[i].split(',')
      let name = suggestion[0].split(':')[1].trim()
      let reason = suggestion[1].split(':')[1].trim()
      formattedSuggestions.push({ name: name, reason: reason })
    }

    let firstSuggestion = await axios.get(
      `${DOMAIN}/api/food-database/v2/parser?app_id=${APP_ID}&app_key=${API_KEY}&ingr=${formattedSuggestions[0].name}`
    )
    formattedSuggestions[0]['edaman'] = firstSuggestion.data.hints[0]
    let secondSuggestion = await axios.get(
      `${DOMAIN}/api/food-database/v2/parser?app_id=${APP_ID}&app_key=${API_KEY}&ingr=${formattedSuggestions[1].name}`
    )
    formattedSuggestions[1]['edaman'] = secondSuggestion.data.hints[0]

    let thirdSuggestion = await axios.get(
      `${DOMAIN}/api/food-database/v2/parser?app_id=${APP_ID}&app_key=${API_KEY}&ingr=${formattedSuggestions[2].name}`
    )
    formattedSuggestions[2]['edaman'] = thirdSuggestion.data.hints[0]

    groceryList.suggestions = formattedSuggestions
    await groceryList.save()

    res.send(groceryList)
  } catch (error) {
    console.log(error)
    res.status(401).send({ status: 'Error', msg: 'An error has occurred!' })
  }
}

const addSuggestion = async (req, res) => {
  const { name, edamanID, measure, quantity } = req.body
  const { payload } = res.locals
  let user = await User.findById(payload.id)
  let ingredient = await Ingredient.findOne({
    user: user._id,
    edamanID,
    measure
  })
  if (!ingredient) {
    ingredient = await Ingredient.create({
      user: user._id,
      edamanID,
      name,
      measure
    })
  }
  try {
    let groceryList = await GroceryList.findById(req.params.groceryId)
    if (
      !groceryList.ingredients
        .map((ingredient) => ingredient.ingredient.toString())
        .includes(ingredient._id.toString())
    ) {
      groceryList.ingredients.push({ ingredient: ingredient._id, quantity })
      let idx = groceryList.suggestions
        .map((suggestion) => suggestion.edaman.food.foodId)
        .indexOf(ingredient.edamanID)
      if (idx !== -1) {
        groceryList.suggestions.splice(idx, 1)
      }
      await groceryList.save()
      return res.send(groceryList)
    }
    res.send('You already have that ingredient in this grocery list!')
  } catch (error) {
    console.log(error)
    res.status(401).send({ status: 'Error', msg: 'An error has occurred!' })
  }
}

const removeSuggestion = async (req, res) => {
  const { name } = req.body
  let groceryList = await GroceryList.findById(req.params.groceryId)
  try {
    let idx = groceryList.suggestions
      .map((suggestion) => suggestion.name)
      .indexOf(name)
    console.log(name, idx)
    if (idx !== -1) {
      groceryList.suggestions.splice(idx, 1)
    }
    await groceryList.save()
    res.send(groceryList)
  } catch (error) {
    console.log(error)
    res.status(401).send({ status: 'Error', msg: 'An error has occurred!' })
  }
}

module.exports = {
  index,
  create,
  add: addRecipe,
  remove,
  delete: deleteGroceryList,
  compile,
  finished,
  suggestions,
  addSuggestion,
  removeSuggestion
}
