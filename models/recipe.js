const mongoose = require('mongoose')
// const Double = require('@mongoosejs/double')

const Schema = mongoose.Schema

const recipeSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    ingredients: [
      {
        ingredient: {
          type: Schema.Types.ObjectId,
          ref: 'Ingredient',
          required: true
        },
        quantity: { type: mongoose.Types.Decimal128, required: true }
      }
    ],
    category: {
      type: String,
      required: true,
      enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert']
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Recipe', recipeSchema)
