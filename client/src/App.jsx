import './App.css'
import './index.css'
import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckSession } from './services/Auth'
import { getRecipes } from './services/recipeServices'
import {
  getGroceryLists,
  createGroceryList
} from './services/groceryListServices'
import Nav from './components/Nav'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Recipes from './pages/Recipes'
import CreateRecipe from './pages/CreateRecipe'
import RecipeDetail from './pages/RecipeDetail'
import SearchIngredients from './pages/SearchIngredients'
import Groceries from './pages/Groceries'
import GroceryDetail from './pages/GroceryDetail'

const App = () => {
  let navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [recipes, setRecipes] = useState(null)
  const [groceries, setGroceries] = useState(null)

  const handleLogOut = () => {
    setUser(null)
    localStorage.clear()
  }

  const checkToken = async () => {
    let user = await CheckSession()
    setUser(user)
  }

  const updateRecipes = async () => {
    let recipes = await getRecipes()
    setRecipes(recipes.data)
  }

  const updateGroceries = async () => {
    let groceries = await getGroceryLists()
    setGroceries(groceries.data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let groceryList = await createGroceryList()
    await updateGroceries()
    navigate(`/groceries/${groceryList.data._id}`)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
    console.log('hit!')
    updateRecipes()
    updateGroceries()
  }, [])

  return (
    <div className="App">
      <Nav user={user} handleLogOut={handleLogOut} />
      <main className="min-h-screen flex flex-col items-center">
        <Routes>
          <Route path="/" element={<Home handleSubmit={handleSubmit} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recipes" element={<Recipes recipes={recipes} />} />
          <Route
            path="/recipes/new"
            element={<CreateRecipe updateRecipes={updateRecipes} />}
          />
          <Route
            path="/recipes/:recipeId"
            element={
              <RecipeDetail recipes={recipes} updateRecipes={updateRecipes} />
            }
          />
          <Route
            path="/recipes/:recipeId/ingredients"
            element={
              <SearchIngredients
                recipes={recipes}
                setRecipes={setRecipes}
                updateRecipes={updateRecipes}
              />
            }
          />
          <Route
            path="/groceries"
            element={
              <Groceries groceries={groceries} handleSubmit={handleSubmit} />
            }
          />
          <Route
            path="/groceries/:groceryId"
            element={<GroceryDetail groceries={groceries} />}
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
