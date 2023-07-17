const { Schema } = require('mongoose')

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

module.exports = recipeSchema
