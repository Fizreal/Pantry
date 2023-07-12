import {
  searchIngredients,
  searchSuggestions
} from '../services/ingredientServices'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import IngredientCard from '../components/IngredientCard'
import SearchBar from '../components/SearchBar'

const SearchIngredients = ({ recipes, updateRecipes }) => {
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

  return (
    <section name="search ingredient" className="flex flex-col items-center">
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
  )
}

export default SearchIngredients
