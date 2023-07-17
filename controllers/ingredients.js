const axios = require('axios')
const APP_ID = process.env.EDAMAN_ID
const API_KEY = process.env.EDAMAN_KEY
const DOMAIN = 'https://api.edamam.com'
require('dotenv').config()
const { Ingredient, User } = require('../models')

const index = async (req, res) => {
  const { payload } = res.locals
  let user = await User.findById(payload.id)
  let ingredients = await Ingredient.find({ user: user._id })
  res.send(ingredients)
}

const search = async (req, res) => {
  const { search } = req.query
  let response = await axios.get(
    `${DOMAIN}/api/food-database/v2/parser?app_id=${APP_ID}&app_key=${API_KEY}&ingr=${search}`
  )
  res.send(response.data.hints)
}

module.exports = { index, search }
