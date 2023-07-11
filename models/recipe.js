const mongoose = require('mongoose')

const Schema = mongoose.Schema

const recipeSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    description: { type: String },
    ingredients: [
      {
        ingredient: {
          type: Schema.Types.ObjectId,
          ref: 'Ingredient',
          required: true
        },
        quantity: { type: String, required: true }
      }
    ],
    category: {
      type: String,
      required: true,
      enum: ['Meal', 'Snack', 'Appetizer', 'Dessert']
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Recipe', recipeSchema)
