import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { addIngredient } from '../services/recipeServices'

const IngredientCard = ({ ingredient, setSearchResults, setSearch }) => {
  const { recipeId } = useParams()

  const [formValues, setFormValues] = useState({
    name: ingredient.food.label,
    edamanID: ingredient.food.foodId,
    measure: '',
    quantity: 0
  })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(formValues)
    addIngredient(recipeId, formValues)
    setSearchResults(null)
    setSearch('')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="quantity"
          id="quantity"
          step=".1"
          value={formValues.quantity}
          min="0"
          onChange={handleChange}
        />
        <label htmlFor="quantity">quantity</label>
        <select
          name="measure"
          id="measure"
          onChange={handleChange}
          defaultValue={''}
        >
          <option value="" disabled>
            Select unit measure
          </option>
          {ingredient.measures.map((measure) => (
            <option key={measure.label} value={measure.label}>
              {measure.label}
            </option>
          ))}
        </select>
        <label htmlFor="measure">measure</label>
        <button>Add to recipe</button>
      </form>
    </div>
  )
}

export default IngredientCard
