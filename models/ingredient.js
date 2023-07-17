const { Schema } = require('mongoose')

const ingredientSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    edamanID: { type: String, required: true },
    name: { type: String, required: true },
    measure: { type: String, required: true }
  },
  { timestamps: true }
)

module.exports = ingredientSchema
