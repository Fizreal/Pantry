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
                      <button className="my-2 py-1 px-2 deleteButton rounded-lg">
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
            <button className="my-2 py-1 px-2 rounded-xl button">
              Add ingredients
            </button>
          </Link>
        </section>
        <button
          className="my-2 py-1 px-2 rounded-xl deleteButton"
          onClick={toggleModal}
        >
          Delete recipe
        </button>
        <div
          className={
            showModal
              ? 'flex justify-center items-center w-full h-full fixed top-0 left-0 z-10 overflow-auto bg-black/60'
              : 'hidden'
          }
        >
          <div className="flex flex-col justify-around border p-5 bg-white rounded-lg w-80 h-40 text-black">
            <h3 className="text-center">
              Are you sure you want to delete this recipe?
            </h3>
            <div className="flex justify-around">
              <form onSubmit={handleDelete}>
                <button className="my-2 py-1 px-2 bg-red-400 hover:bg-red-600 rounded-xl">
                  Delete
                </button>
              </form>
              <button
                className="my-2 py-1 px-2 rounded-xl hover:bg-gray-200"
                onClick={toggleModal}
              >
                Cancel
              </button>
            </div>
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
