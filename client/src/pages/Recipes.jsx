import RecipeListCard from '../components/RecipeListCard'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const Recipes = ({ recipes }) => {
  const [filter, setFilter] = useState([
    'Meal',
    'Snack',
    'Appetizer',
    'Dessert'
  ])

  const handleChange = async (e) => {
    if (e.target.value === 'All') {
      setFilter(['Meal', 'Snack', 'Appetizer', 'Dessert'])
    } else {
      setFilter(e.target.value)
    }
  }

  return (
    <section name="recipes" className="flex flex-col items-center w-80">
      <Link to="/recipes/new" className="m-2">
        <button className="p-2 border rounded-xl">New recipe</button>
      </Link>
      <h1 className="text-xl m-2">Your Recipes:</h1>
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
        {recipes ? (
          recipes
            .filter((recipe) => filter.includes(recipe.category))
            .map((recipe) => (
              <RecipeListCard key={recipe._id} recipe={recipe} />
            ))
        ) : (
          <p>No recipes</p>
        )}
      </div>
    </section>
  )
}

export default Recipes
