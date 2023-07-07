const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ingredientSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    edamanID: { type: String, required: true },
    name: { type: String, required: true },
    measure: { type: String, required: true }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Ingredient', ingredientSchema)
