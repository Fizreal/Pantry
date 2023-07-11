import { useState } from 'react'
import { createRecipe } from '../services/recipeServices'
import { useNavigate } from 'react-router-dom'

const CreateRecipe = ({ updateRecipes }) => {
  let navigate = useNavigate()
  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    category: 'Meal'
  })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    let recipe = await createRecipe(formValues)
    await updateRecipes()
    navigate(`/recipes/${recipe._id}`)
  }

  return (
    <section name="new recipe">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formValues.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            name="description"
            id="description"
            value={formValues.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <select
            name="category"
            id="category"
            onChange={handleChange}
            defaultValue={'meal'}
            required
          >
            <option value="Meal">Meal</option>
            <option value="Snack">Snack</option>
            <option value="Appetizer">Appetizer</option>
            <option value="Dessert">Dessert</option>
          </select>
        </div>
        <button>Create</button>
      </form>
    </section>
  )
}

export default CreateRecipe
