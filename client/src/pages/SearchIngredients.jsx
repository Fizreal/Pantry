import {
  searchIngredients,
  searchSuggestions
} from '../services/ingredientServices'
import { useState } from 'react'
import IngredientCard from '../components/IngredientCard'
import SearchBar from '../components/SearchBar'

const SearchIngredients = () => {
  const [searchResults, setSearchResults] = useState(null)
  const [search, setSearch] = useState('')

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let search = e.target.search.value
    console.log(search)
    let results = await searchIngredients(search)
    setSearchResults(results.data)
  }

  return (
    <div>
      <SearchBar
        search={search}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
      <div>
        <h1>Search Results</h1>
        {searchResults ? (
          <div>
            {searchResults.map((ingredient) => (
              <IngredientCard
                key={ingredient.food.foodId}
                ingredient={ingredient}
                setSearchResults={setSearchResults}
                setSearch={setSearch}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default SearchIngredients
