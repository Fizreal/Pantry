import {
  searchIngredients,
  searchSuggestions
} from '../services/ingredientServices'
import { useState } from 'react'
import IngredientCard from '../components/IngredientCard'
import SearchBar from '../components/SearchBar'

const SearchIngredients = ({ updateRecipes }) => {
  const [searchResults, setSearchResults] = useState(null)
  const [search, setSearch] = useState('')

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let search = e.target.search.value
    let results = await searchIngredients(search)
    setSearchResults(results.data)
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
