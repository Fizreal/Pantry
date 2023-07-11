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

  return recipe ? (
    <section name="recipe" className="flex flex-col items-center w-80">
      <h1 className="text-xl m-2">{recipe.name}</h1>
      <p>Category: {recipe.category}</p>
      <p>Description: {recipe.description}</p>
      <section name="ingredients" className="flex flex-col w-80">
        <h2 className="text-lg m-2 self-center">Ingredients</h2>
        <ul>
          {recipe.ingredients.map((ingr) => (
            <li key={ingr.ingredient._id}>
              {ingr.quantity} {ingr.ingredient.measure} {ingr.ingredient.name}
            </li>
          ))}
        </ul>
        <Link to={`/recipes/${recipe._id}/ingredients`} className="self-center">
          <button className="p-2 border rounded-xl">Add</button>
        </Link>
      </section>
    </section>
  ) : (
    <section name="recipe" className="flex flex-col items-center w-80">
      <h1 className="text-xl m-2">Recipe not found</h1>
    </section>
  )
}

export default RecipeDetail
