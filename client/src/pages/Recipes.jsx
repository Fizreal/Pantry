import RecipeListCard from '../components/RecipeListCard'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Recipes = ({ recipes, user }) => {
  let navigate = useNavigate()
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

  return user ? (
    <section name="recipes" className="flex flex-col items-center mt-8">
      <h1 className="text-2xl mb-2">Your Recipes:</h1>
      <Link to="/recipes/new" className="">
        <button className=" m-2 py-1 px-2 shadow-md rounded-xl button">
          New recipe
        </button>
      </Link>
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
      <div className="flex flex-wrap justify-center">
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
  ) : (
    <section className="flex flex-col items-center mt-8">
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

export default Recipes
