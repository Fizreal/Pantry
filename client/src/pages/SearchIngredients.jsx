import {
  searchIngredients,
  searchSuggestions
} from '../services/ingredientServices'
import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import IngredientCard from '../components/IngredientCard'
import SearchBar from '../components/SearchBar'

const SearchIngredients = ({ recipes, updateRecipes, user }) => {
  let navigate = useNavigate()
  const [searchResults, setSearchResults] = useState(null)
  const [search, setSearch] = useState('')

  const { recipeId } = useParams()

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const filterIngredients = (results) => {
    if (recipes) {
      let recipe = recipes.find((recipe) => recipe._id === recipeId)
      let includedIngredients = recipe.ingredients.map(
        (ingr) => ingr.ingredient.edamanID
      )
      let filteredSearch = results.filter(
        (result) => !includedIngredients.includes(result.food.foodId)
      )
      return filteredSearch
    }
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let results = await searchIngredients(e.target.search.value)
    let filteredResults = filterIngredients(results.data)
    setSearchResults(filteredResults)
  }

  return user ? (
    <section name="search ingredient" className="flex flex-col items-center">
      <div className="w-80">
        <Link to={`/recipes/${recipeId}`}>
          <button className="py-1 px-2  self-center border rounded-xl">
            Back
          </button>
        </Link>
      </div>
      <SearchBar
        search={search}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
      <div className="m-3">
        <h1 className="text-xl">Search Results</h1>
        {searchResults ? (
          <div>
            {searchResults.map((ingredient) => (
              <IngredientCard
                key={ingredient.food.foodId}
                ingredient={ingredient}
                setSearchResults={setSearchResults}
                setSearch={setSearch}
                updateRecipes={updateRecipes}
              />
            ))}
          </div>
        ) : null}
      </div>
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

export default SearchIngredients
