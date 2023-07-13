import { useState } from 'react'
import { createRecipe } from '../services/recipeServices'
import { useNavigate } from 'react-router-dom'

const CreateRecipe = ({ updateRecipes, user }) => {
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
    updateRecipes()
    navigate(`/recipes/${recipe._id}`)
  }

  return user ? (
    <section name="new recipe">
      <form
        onSubmit={handleSubmit}
        className="w-80 flex flex-col border p-3 rounded-lg"
      >
        <div className="my-1">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formValues.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded ml-1 py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="my-1">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            name="description"
            id="description"
            value={formValues.description}
            onChange={handleChange}
            className="shadow appearance-none border rounded ml-1 py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="my-1">
          <label htmlFor="category">Category:</label>
          <select
            name="category"
            id="category"
            onChange={handleChange}
            defaultValue={'meal'}
            className="shadow appearance-none border rounded  ml-1 py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="Meal">Meal</option>
            <option value="Snack">Snack</option>
            <option value="Appetizer">Appetizer</option>
            <option value="Dessert">Dessert</option>
          </select>
        </div>
        <button className="my-2 py-1 px-2  self-center border rounded-xl">
          Create
        </button>
      </form>
    </section>
  ) : (
    <div className="flex flex-col items-center">
      <h1>Oops! You must be signed in to do that!</h1>
      <button
        onClick={() => navigate('/login')}
        className="my-2 py-1 px-2 border rounded-xl"
      >
        Sign In
      </button>
    </div>
  )
}

export default CreateRecipe
