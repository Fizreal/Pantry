import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const RecipeDetail = ({ recipes }) => {
  const [recipe, setRecipe] = useState(null)

  const { recipeId } = useParams()

  useEffect(() => {
    const selectRecipe = () => {
      let selectRecipe = recipes.find((recipe) => {
        return recipe._id === recipeId
      })
      setRecipe(selectRecipe)
    }
    selectRecipe()
  }, [])

  return (
    <div>
      <h1>{recipe.name}</h1>
    </div>
  )
}

export default RecipeDetail
