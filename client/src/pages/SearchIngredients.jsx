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
  const [searchResults, setSearchResults] = useState([])
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
    return []
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let results = await searchIngredients(e.target.search.value)
    let filteredResults = filterIngredients(results.data)
    setSearchResults(filteredResults)
  }

  return user ? (
    <section
      name="search ingredient"
      className="mt-8 flex flex-col items-center text-center w-80 md:w-[700px] lg:w-[1020px]"
    >
      <div className="self-start ml-2">
        <Link to={`/recipes/${recipeId}`}>
          <button className="py-1 px-2 button rounded-xl">Back</button>
        </Link>
      </div>
      <SearchBar
        search={search}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
      <h1 className="text-2xl">Search Results</h1>
      {searchResults ? (
        <div className="flex flex-wrap text-left justify-center w-80 md:w-[700px] lg:w-[1020px]">
          {searchResults.map((ingredient, idx) => (
            <IngredientCard
              key={idx}
              ingredient={ingredient}
              setSearchResults={setSearchResults}
              setSearch={setSearch}
              updateRecipes={updateRecipes}
            />
          ))}
        </div>
      ) : null}
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

export default SearchIngredients
