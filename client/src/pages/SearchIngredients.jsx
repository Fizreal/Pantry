import {
  searchIngredients,
  searchSuggestions
} from '../services/ingredientServices'
import { useState } from 'react'
import IngredientCard from '../components/IngredientCard'
import SearchBar from '../components/SearchBar'

const SearchIngredients = () => {
  const [searchResults, setSearchResults] = useState(null)

  const handleSubmit = async (e, search) => {
    e.preventDefault()
    let results = await searchIngredients(search)
    setSearchResults(results)
  }

  return (
    <div>
      <SearchBar handleSubmit={handleSubmit} />
      <div>
        <h1>Search Results</h1>
        {searchResults ? (
          <div>
            {searchResults.map((ingredient) => (
              <IngredientCard key={ingredient.foodId} ingredient={ingredient} />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default SearchIngredients
