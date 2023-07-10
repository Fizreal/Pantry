import { useState } from 'react'
import { createRecipe } from '../services/recipeServices'
import { useNavigate } from 'react-router-dom'

const CreateRecipe = ({ recipes, setRecipes }) => {
  let navigate = useNavigate()
  const [formValues, setFormValues] = useState({ name: '', category: 'Dinner' })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    let recipe = await createRecipe(formValues)
    let updatedList = [...recipes]
    setRecipes(updatedList.push(recipe))
    navigate(`/recipes/${recipe._id}`)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formValues.name}
          onChange={handleChange}
          required
        />
        <label htmlFor="category">Category:</label>
        <select
          name="category"
          id="category"
          onChange={handleChange}
          defaultValue={'meal'}
          required
        >
          <option value="meal">Meal</option>
          <option value="appetizer">Appetizer</option>
          <option value="dessert">Dessert</option>
        </select>
        <button>Create</button>
      </form>
    </div>
  )
}

export default CreateRecipe
