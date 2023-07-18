import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { addIngredient } from '../services/recipeServices'
import { formToJSON } from 'axios'

const IngredientCard = ({
  ingredient,
  setSearchResults,
  setSearch,
  updateRecipes
}) => {
  const { recipeId } = useParams()

  const [formValues, setFormValues] = useState({
    name: null,
    edamanID: null,
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
    if (formValues.name !== ingredient.food.label) {
      setFormValues({
        ...formValues,
        name: ingredient.food.label,
        edamanID: ingredient.food.foodId
      })
    }
    let checkDisabled =
      formValues.measure && formValues.quantity !== '0' ? false : true
    setDisabled(checkDisabled)
  }, [ingredient, formValues])

  return (
    <div className="flex flex-col p-2 w-80 m-2 rounded-lg card shadow">
      <h3 className="self-center text-lg">{ingredient.food.label}</h3>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div>
          <div className="my-2 flex w-20">
            <div className="">
              <label htmlFor="quantity">Quantity:</label>
            </div>
            <input
              type="number"
              name="quantity"
              id="quantity"
              step=".1"
              value={formValues.quantity}
              min="0"
              onChange={handleChange}
              className="w-14 text-center shadow appearance-none rounded input ml-2 py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="my-2 flex w-20">
            <div className="">
              <label htmlFor="measure">Measure:</label>
            </div>
            <select
              name="measure"
              id="measure"
              onChange={handleChange}
              value={formValues.measure}
              className="shadow appearance-none input text-center rounded ml-2 py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
          className="p-1.5 self-center button rounded-xl"
          disabled={disabled}
        >
          Add to recipe
        </button>
      </form>
    </div>
  )
}

export default IngredientCard
