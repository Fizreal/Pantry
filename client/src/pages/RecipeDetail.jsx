import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

const RecipeDetail = ({ recipes }) => {
  const [recipe, setRecipe] = useState(null)

  const { recipeId } = useParams()

  useEffect(() => {
    const selectRecipe = () => {
      if (recipes) {
        let selectRecipe = recipes.find((recipe) => {
          return recipe._id === recipeId
        })
        setRecipe(selectRecipe)
      }
    }
    selectRecipe()
  }, [recipes, recipeId])

  return (
    <div>
      {recipe ? (
        <div>
          <h1>{recipe.name}</h1>
          <p>{recipe.category}</p>
          <Link to={`/recipes/${recipe._id}/ingredients`}>
            <button>Add Ingredients</button>
          </Link>
        </div>
      ) : (
        <h1>Recipe not found</h1>
      )}
    </div>
  )
}

export default RecipeDetail
