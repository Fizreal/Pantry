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
  const { email } = req.body
  let user = await User.findOne({ email })
  let groceryLists = await GroceryList.find({ user: user._id })
  res.send(groceryLists)
}

const show = async (req, res) => {
  let groceryList = await GroceryList.findById(req.params.groceryId).populate([
    'recipes',
    'ingredients.ingredient'
  ])
  res.send(groceryList)
}

const create = async (req, res) => {
  const { email } = req.body
  let user = await User.findOne({ email })
  try {
    let groceryList = await GroceryList.create({ user: user._id })
    res.send(groceryList)
  } catch (error) {
    console.log(error)
    res.status(401).send({ status: 'Error', msg: 'An error has occurred!' })
  }
}
const addRecipe = async (req, res) => {}
const remove = async (req, res) => {}
const deleteGroceryList = async (req, res) => {}
const compile = async (req, res) => {}
const finished = async (req, res) => {}

module.exports = {
  index,
  show,
  create,
  add: addRecipe,
  remove,
  delete: deleteGroceryList,
  compile,
  finished
}
