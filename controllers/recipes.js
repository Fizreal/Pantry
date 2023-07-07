const axios = require('axios')
const APP_ID = process.env.EDAMAN_ID
const API_KEY = process.env.EDAMAN_KEY
const DOMAIN = 'https://api.edamam.com/api/food-database/v2/parser/'
require('dotenv').config()
const User = require('../models/user')
const Recipe = require('../models/recipe')
const Ingredient = require('../models/ingredient')

const index = async (req, res) => {
  const { email } = req.body
  let user = await User.findOne({ email })
  let recipes = await Recipe.find({ user: user._id })
  res.send(recipes)
}

const show = async (req, res) => {
  let recipe = await Recipe.findById(req.params.recipeId).populate(
    'ingredients.ingredient'
  )
  res.send(recipe)
}

const createRecipe = async (req, res) => {
  try {
    const { email, name, category } = req.body
    let user = await User.findOne({ email })
    console.log(user)
    let recipe = await Recipe.create({ user: user._id, name, category })
    res.send(recipe)
  } catch (error) {
    console.log(error)
    res.status(401).send({ status: 'Error', msg: 'An error has occurred!' })
  }
}

const addIngredient = async (req, res) => {
  const { email, name, edamanID, measure, quantity } = req.body
  let user = await User.findOne({ email })
  let ingredient = await Ingredient.findOne({
    user: user._id,
    edamanID,
    measure
  })
  console.log(ingredient)
  if (!ingredient) {
    ingredient = await Ingredient.create({
      user: user._id,
      edamanID,
      name,
      measure
    })
  }
  try {
    let recipe = await Recipe.findById(req.params.recipeId)
    if (
      !recipe.ingredients
        .map((ingredient) => ingredient.ingredient)
        .includes(ingredient._id)
    ) {
      recipe.ingredients.push({ ingredient: ingredient._id, quantity })
      await recipe.save()
      res.send(recipe)
    }
  } catch (error) {
    console.log(error)
    res.status(401).send({ status: 'Error', msg: 'An error has occurred!' })
  }
}

module.exports = { index, show, createRecipe, add: addIngredient }
