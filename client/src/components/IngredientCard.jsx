import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { addIngredient } from '../services/recipeServices'

const IngredientCard = ({
  ingredient,
  setSearchResults,
  setSearch,
  updateRecipes
}) => {
  const { recipeId } = useParams()

  const [formValues, setFormValues] = useState({
    name: ingredient.food.label,
    edamanID: ingredient.food.foodId,
    measure: '',
    quantity: '0'
  })
  const [disabled, setDisabled] = useState(true)

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await addIngredient(recipeId, formValues)
    updateRecipes()
    setSearchResults(null)
    setSearch('')
  }

  useEffect(() => {
    let checkDisabled =
      formValues.measure && formValues.quantity !== '0' ? false : true
    setDisabled(checkDisabled)
  }, [formValues])

  return (
    <div className="flex flex-col p-2 w-80 border m-2 rounded-lg">
      <h3 className="self-center text-lg">{ingredient.food.label}</h3>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div>
          <div className="my-2">
            {' '}
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              step=".1"
              value={formValues.quantity}
              min="0"
              onChange={handleChange}
              className="w-10 text-center shadow appearance-none border rounded  ml-1 py-0.5 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="my-2">
            {' '}
            <label htmlFor="measure">Measure:</label>
            <select
              name="measure"
              id="measure"
              onChange={handleChange}
              value={formValues.measure}
              className="shadow appearance-none border rounded  ml-1 py-0.5 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
          </div>
        </div>
        <button
          className="p-1.5 self-center border rounded-xl"
          disabled={disabled}
        >
          Add to recipe
        </button>
      </form>
    </div>
  )
}

export default IngredientCard
