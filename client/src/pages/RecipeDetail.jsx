import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { removeIngredient, deleteRecipe } from '../services/recipeServices'

const RecipeDetail = ({ recipes, updateRecipes, user }) => {
  let navigate = useNavigate()
  const [recipe, setRecipe] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const { recipeId } = useParams()

  const toggleModal = () => {
    setShowModal((prev) => !prev)
  }

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

  return user ? (
    recipe ? (
      <section name="recipe" className="flex flex-col items-center w-80">
        <h1 className="text-xl m-2">{recipe.name}</h1>
        <p>Category: {recipe.category}</p>
        <p>Description: {recipe.description}</p>
        <section name="ingredients" className="flex flex-col w-80 text-center">
          <h2 className="text-lg m-2">Ingredients</h2>
          <table>
            <thead>
              <tr>
                <th>Quantity</th>
                <th>Unit</th>
                <th>Ingredient</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {recipe.ingredients.map((ingr) => (
                <tr key={ingr.ingredient._id} className="w-80 border-b">
                  <td>{ingr.quantity}</td>
                  <td>{ingr.ingredient.measure}</td>
                  <td>{ingr.ingredient.name}</td>
                  <td className="flex justify-center items-center">
                    <form
                      onSubmit={(e) => handleRemove(e, ingr.ingredient._id)}
                      className="justify-center items-center"
                    >
                      <button className="my-2 py-1 px-2 border rounded-lg">
                        X
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link
            to={`/recipes/${recipe._id}/ingredients`}
            className="self-center"
          >
            <button className="my-2 py-1 px-2 border rounded-xl">
              Add ingredients
            </button>
          </Link>
        </section>
        <button
          className="my-2 py-1 px-2 border rounded-xl"
          onClick={toggleModal}
        >
          Delete recipe
        </button>
        <div
          className={
            showModal
              ? 'block w-full h-full fixed top-0 left-0 z-10 overflow-auto bg-black/60'
              : 'hidden'
          }
        >
          <div className="border mx-auto my-32 p-5 bg-white w-4/5 rounded-lg">
            <h3>Are you sure you want to delete this recipe?</h3>
            <form onSubmit={handleDelete}>
              <button className="my-2 py-1 px-2 border rounded-xl">
                Delete
              </button>
            </form>
            <button
              className="my-2 py-1 px-2 border rounded-xl"
              onClick={toggleModal}
            >
              Cancel
            </button>
          </div>
        </div>
      </section>
    ) : (
      <section name="recipe" className="flex flex-col items-center w-80">
        <h1 className="text-xl m-2">Recipe not found</h1>
      </section>
    )
  ) : (
    <div className="flex flex-col items-center">
      <h1>Oops! You must be signed in to do that!</h1>
      <button
        onClick={() => navigate('/login')}
        className="my-2 py-1 px-2 border rounded-xl"
      >
        Sign In
      </button>
    </div>
  )
}

export default RecipeDetail
