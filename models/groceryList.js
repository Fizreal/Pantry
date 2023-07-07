const mongoose = require('mongoose')

const Schema = mongoose.Schema

const groceryListSchema = new Schema(
  {
    recipes: [{ type: Schema.Types.ObjectId, ref: 'Recipe' }],
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    ingredients: [
      {
        Ingredient: { type: Schema.Types.ObjectId, ref: 'Ingredient' },
        quantity: { type: Decimal128 }
      }
    ],
    finished: { type: Boolean, required: true }
  },
  { timestamps: true }
)

module.exports = mongoose.model('GroceryList', groceryListSchema)
