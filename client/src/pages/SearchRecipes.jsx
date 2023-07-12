import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import RecipeCard from '../components/RecipeCard'
import { addRecipe } from '../services/groceryListServices'

const SearchRecipes = ({ recipes, updateGroceries }) => {
  const [filter, setFilter] = useState([
    'Meal',
    'Snack',
    'Appetizer',
    'Dessert'
  ])

  const { groceryId } = useParams()

  const handleChange = async (e) => {
    if (e.target.value === 'All') {
      setFilter(['Meal', 'Snack', 'Appetizer', 'Dessert'])
    } else {
      setFilter(e.target.value)
    }
  }

  const handleSubmit = async (e, recipeId) => {
    e.preventDefault()
    console.log(recipeId)
    await addRecipe(groceryId, recipeId)
    updateGroceries()
  }

  return (
    <section>
      <h1>Recipes</h1>
      <div>
        <label htmlFor="filter">Filter by recipe category:</label>
        <select
          name="filter"
          id="filter"
          onChange={handleChange}
          defaultValue="All"
        >
          <option value="All">Show all</option>
          <option value="Meal">Meal</option>
          <option value="Snack">Snack</option>
          <option value="Appetizer">Appetizer</option>
          <option value="Dessert">Dessert</option>
        </select>
      </div>
      <div>
        {recipes
          ? recipes
              .filter((recipe) => filter.includes(recipe.category))
              .map((recipe) => (
                <RecipeCard
                  key={recipe._id}
                  recipe={recipe}
                  handleSubmit={handleSubmit}
                />
              ))
          : null}
      </div>
    </section>
  )
}

export default SearchRecipes
