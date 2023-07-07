const mongoose = require('mongoose')

const Schema = mongoose.Schema

const recipeSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    ingredients: [
      {
        ingredient_id: {
          type: Schema.Types.ObjectId,
          ref: 'Ingredient',
          required: true
        },
        quantity: { type: Decimal128, required: true }
      }
    ]
  },
  { timestamps: true }
)

module.exports = mongoose.model('Recipe', recipeSchema)
