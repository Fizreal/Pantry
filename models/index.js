const mongoose = require('mongoose')
const groceryListSchema = require('./groceryList')
const recipeSchema = require('./recipe')
const ingredientSchema = require('./ingredient')
const userSchema = require('./user')

const GroceryList = mongoose.model('GroceryList', groceryListSchema)
const Recipe = mongoose.model('Recipe', recipeSchema)
const Ingredient = mongoose.model('Ingredient', ingredientSchema)
const User = mongoose.model('User', userSchema)

module.exports = {
  GroceryList,
  Recipe,
  Ingredient,
  User
}
