const axios = require('axios')
const APP_ID = process.env.EDAMAN_ID
const API_KEY = process.env.EDAMAN_KEY
const DOMAIN = 'https://api.edamam.com/api/food-database/v2/parser/'
require('dotenv').config()
const User = require('../models/user')
const GroceryList = require('../models/groceryList')
const Recipe = require('../models/recipe')
const Ingredient = require('../models/ingredient')

const index = async (req, res) => {
  const { payload } = res.locals
  let user = await User.findById(payload.id)
  let groceryLists = await GroceryList.find({ user: user._id }).populate([
    'recipes',
    'ingredients.ingredient'
  ])
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
  let groceryList = await GroceryList.findById(req.params.groceryId).populate(
    'recipes'
  )
  console.log(groceryList)
  let ingredients = []
  try {
    groceryList.recipes.forEach((recipe) => {
      recipe.ingredients.forEach((ingredientObj) => {
        let index = ingredients.indexOf(ingredientObj.ingredient.toString())
        if (index === -1) {
          ingredients.push(ingredientObj.ingredient.toString())
          groceryList.ingredients.push(ingredientObj)
        } else {
          parseFloat(groceryList.ingredients[index].quantity) += parseFloat(ingredientObj.quantity)
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
const finished = async (req, res) => {}

module.exports = {
  index,
  create,
  add: addRecipe,
  remove,
  delete: deleteGroceryList,
  compile,
  finished
}
