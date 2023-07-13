import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import RecipeCard from '../components/RecipeCard'
import { addRecipe } from '../services/groceryListServices'

const SearchRecipes = ({ recipes, groceries, updateGroceries }) => {
  const [filter, setFilter] = useState([
    'Meal',
    'Snack',
    'Appetizer',
    'Dessert'
  ])
  const [availableRecipes, setAvailableRecipes] = useState([])

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

  useEffect(() => {
    const filterRecipes = () => {
      if (groceries) {
        let groceryList = groceries.find(
          (groceryList) => groceryList._id === groceryId
        )
        let includedRecipes = groceryList.recipes.map((recipe) => recipe._id)
        let filteredRecipes = recipes.filter(
          (recipe) => !includedRecipes.includes(recipe._id)
        )
        setAvailableRecipes(filteredRecipes)
      }
    }
    filterRecipes()
  }, [groceries])

  return (
    <section>
      <div className="w-80">
        <Link to={`/groceries/${groceryId}`}>
          <button>Back</button>
        </Link>
      </div>
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
        {availableRecipes.length ? (
          availableRecipes
            .filter((recipe) => filter.includes(recipe.category))
            .map((recipe) => (
              <RecipeCard
                key={recipe._id}
                recipe={recipe}
                handleSubmit={handleSubmit}
              />
            ))
        ) : (
          <h2>No recipes available</h2>
        )}
      </div>
    </section>
  )
}

export default SearchRecipes
