import './App.css'
import './index.css'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
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
import SearchRecipes from './pages/SearchRecipes'

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
      updateRecipes()
      updateGroceries()
    }
    console.log('hit!')
  }, [])

  return (
    <div className="App mainFont">
      <Nav user={user} handleLogOut={handleLogOut} />
      <main className="min-h-screen flex flex-col items-center mainBackground">
        <Routes>
          <Route
            path="/login"
            element={
              <Login
                setUser={setUser}
                updateRecipes={updateRecipes}
                updateGroceries={updateGroceries}
              />
            }
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={<Home handleSubmit={handleSubmit} user={user} />}
          />
          <Route
            path="/recipes"
            element={<Recipes recipes={recipes} user={user} />}
          />
          <Route
            path="/recipes/new"
            element={<CreateRecipe updateRecipes={updateRecipes} user={user} />}
          />
          <Route
            path="/recipes/:recipeId"
            element={
              <RecipeDetail
                recipes={recipes}
                updateRecipes={updateRecipes}
                user={user}
              />
            }
          />
          <Route
            path="/recipes/:recipeId/ingredients"
            element={
              <SearchIngredients
                recipes={recipes}
                setRecipes={setRecipes}
                updateRecipes={updateRecipes}
                user={user}
              />
            }
          />
          <Route
            path="/groceries"
            element={
              <Groceries
                groceries={groceries}
                handleSubmit={handleSubmit}
                user={user}
              />
            }
          />
          <Route
            path="/groceries/:groceryId"
            element={
              <GroceryDetail
                groceries={groceries}
                updateGroceries={updateGroceries}
                user={user}
              />
            }
          />
          <Route
            path="/groceries/:groceryId/recipes"
            element={
              <SearchRecipes
                recipes={recipes}
                groceries={groceries}
                updateGroceries={updateGroceries}
                user={user}
              />
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
