import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { removeIngredient, deleteRecipe } from '../services/recipeServices'

const RecipeDetail = ({ recipes, updateRecipes }) => {
  let navigate = useNavigate()
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

  const handleRemove = async (e, ingredientId) => {
    e.preventDefault()
    await removeIngredient(recipeId, ingredientId)
    updateRecipes()
  }

  const handleDelete = async (e) => {
    e.preventDefault()
    deleteRecipe(recipeId)
    updateRecipes()
    navigate('/recipes')
  }

  return recipe ? (
    <section name="recipe" className="flex flex-col items-center w-80">
      <h1 className="text-xl m-2">{recipe.name}</h1>
      <p>Category: {recipe.category}</p>
      <p>Description: {recipe.description}</p>
      <section name="ingredients" className="flex flex-col w-80">
        <h2 className="text-lg m-2 self-center">Ingredients</h2>
        <table>
          <tbody>
            {recipe.ingredients.map((ingr) => (
              <tr key={ingr.ingredient._id} className="w-80">
                <td>
                  {ingr.quantity} {ingr.ingredient.measure}{' '}
                  {ingr.ingredient.name}
                </td>
                <td className="flex justify-center items-center">
                  <form
                    onSubmit={(e) => handleRemove(e, ingr.ingredient._id)}
                    className="justify-center items-center"
                  >
                    <button>X</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to={`/recipes/${recipe._id}/ingredients`} className="self-center">
          <button className="p-2 border rounded-xl">Add</button>
        </Link>
      </section>
      <form onSubmit={handleDelete}>
        <button>Delete recipe</button>
      </form>
    </section>
  ) : (
    <section name="recipe" className="flex flex-col items-center w-80">
      <h1 className="text-xl m-2">Recipe not found</h1>
    </section>
  )
}

export default RecipeDetail
