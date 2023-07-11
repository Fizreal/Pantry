const mongoose = require('mongoose')

const Schema = mongoose.Schema

const groceryListSchema = new Schema(
  {
    recipes: [{ type: Schema.Types.ObjectId, ref: 'Recipe' }],
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    ingredients: [
      {
        ingredient: { type: Schema.Types.ObjectId, ref: 'Ingredient' },
        quantity: { type: String }
      }
    ],
    date: { type: Date, default: new Date() },
    finished: { type: Boolean, required: true, default: false }
  },
  { timestamps: true }
)

module.exports = mongoose.model('GroceryList', groceryListSchema)
