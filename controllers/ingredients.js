const axios = require('axios')
const APP_ID = process.env.EDAMAN_ID
const API_KEY = process.env.EDAMAN_KEY
const DOMAIN = 'https://api.edamam.com'
require('dotenv').config()
const User = require('../models/user')
const Ingredient = require('../models/ingredient')

const index = async (req, res) => {
  const { email } = req.body
  let user = await User.findOne({ email })
  let ingredients = await Ingredient.find({ user: user._id })
  res.send(ingredients)
}

const search = async (req, res) => {
  const { search } = req.body
  let response = await axios.get(
    `${DOMAIN}/api/food-database/v2/parser?app_id=${APP_ID}&app_key=${API_KEY}&ingr=${search}`
  )
  res.send(response.data.hints)
}

const suggestions = async (req, res) => {
  const { search } = req.body
  let response = await axios.get(
    `${DOMAIN}/auto-complete?app_id=${APP_ID}&app_key=${API_KEY}&q=${search}`
  )
  res.send(response.data)
}

module.exports = { index, search, suggestions }
