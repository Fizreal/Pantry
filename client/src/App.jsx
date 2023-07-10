import './App.css'
import './index.css'
import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { CheckSession } from './services/Auth'
import { getRecipes } from './services/recipeServices'
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
  const [user, setUser] = useState(null)
  const [recipes, setRecipes] = useState(null)

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

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
    console.log('hit!')
    updateRecipes()
  }, [])

  return (
    <div className="App">
      <Nav user={user} handleLogOut={handleLogOut} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recipes" element={<Recipes recipes={recipes} />} />
          <Route
            path="/recipes/new"
            element={<CreateRecipe recipes={recipes} setRecipes={setRecipes} />}
          />
          <Route
            path="/recipes/:recipeId"
            element={<RecipeDetail recipes={recipes} />}
          />
          <Route
            path="/recipes/:recipeId/ingredients"
            element={<SearchIngredients />}
          />
          <Route path="/groceries" element={<Groceries />} />
          <Route path="/groceries/:groceryId" element={<GroceryDetail />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
