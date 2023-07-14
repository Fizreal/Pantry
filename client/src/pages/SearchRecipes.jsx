import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import RecipeCard from '../components/RecipeCard'
import { addRecipe } from '../services/groceryListServices'

const SearchRecipes = ({ recipes, groceries, updateGroceries, user }) => {
  const navigate = useNavigate()
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

  return user ? (
    <section className="mt-8 flex flex-col items-center text-center">
      <div className="self-start ml-2">
        <Link to={`/groceries/${groceryId}`}>
          <button className="py-1 px-2 button rounded-xl">Back</button>
        </Link>
      </div>
      <h1 className="text-2xl mb-2">Recipes</h1>
      <div className="m-2">
        <label htmlFor="filter">Filter by category:</label>
        <select
          name="filter"
          id="filter"
          onChange={handleChange}
          defaultValue="All"
          className="shadow appearance-none border rounded  ml-1 py-0.5 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="All">Show all</option>
          <option value="Meal">Meal</option>
          <option value="Snack">Snack</option>
          <option value="Appetizer">Appetizer</option>
          <option value="Dessert">Dessert</option>
        </select>
      </div>
      <div className="flex flex-wrap justify-center w-80 md:w-[700px] lg:w-[1020px]">
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
  ) : (
    <section name="Unauthorized" className="flex flex-col items-center mt-8">
      <h1 className="">Oops! You must be signed in to do that!</h1>
      <button
        onClick={() => navigate('/login')}
        className="my-2 py-1 px-2 button rounded-xl"
      >
        Sign In
      </button>
    </section>
  )
}

export default SearchRecipes
