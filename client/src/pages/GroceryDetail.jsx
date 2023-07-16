import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  removeRecipe,
  deleteGroceryList,
  compileGroceries,
  finishGroceryList,
  ingredientSuggestions
} from '../services/groceryListServices'
import SuggestedIngredient from '../components/SuggestedIngredient'

const GroceryDetail = ({ groceries, updateGroceries, user }) => {
  let navigate = useNavigate()
  const [groceryList, setGroceryList] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [formValues, setFormValues] = useState({})

  const { groceryId } = useParams()

  useEffect(() => {
    const selectGroceryList = () => {
      let selectGroceryList
      if (groceries) {
        let selectGroceryList = groceries.find((grocery) => {
          return grocery._id === groceryId
        })
        setGroceryList(selectGroceryList)
      }
    }
    selectGroceryList()
  }, [groceries, groceryId])

  const toggleModal = () => {
    setShowModal((prev) => !prev)
  }

  const handleRemove = async (e, recipeId) => {
    e.preventDefault()
    await removeRecipe(groceryId, recipeId)
    updateGroceries()
  }

  const handleDelete = async (e) => {
    e.preventDefault()
    await deleteGroceryList(groceryId)
    updateGroceries()
    navigate('/groceries')
  }

  const handleCompile = async (e) => {
    e.preventDefault()
    setFormValues({})
    await compileGroceries(groceryId)
    updateGroceries()
  }

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleFinished = async (e) => {
    e.preventDefault()
    await finishGroceryList(groceryId, formValues)
    updateGroceries()
  }

  const handleSuggestions = async (e) => {
    e.preventDefault()
    await ingredientSuggestions(groceryId)
    updateGroceries()
  }

  return user ? (
    groceryList ? (
      <section name="grocery list" className="flex flex-col items-center mt-8">
        <h1 className="text-2xl m-2">{groceryList.date.slice(0, 10)}</h1>
        <p>Status: {groceryList.finished ? 'Complete' : 'Open'}</p>
        {(groceryList.recipes.length || groceryList.ingredients.length) &&
        !groceryList.finished ? (
          <form onSubmit={handleCompile}>
            <button className="my-2 py-1 px-2 button rounded-xl">
              Generate grocery list
            </button>
          </form>
        ) : null}
        {groceryList.ingredients.length ? (
          !groceryList.finished ? (
            <section className="text-center">
              <h2 className="text-lg m-2">Consolidated shopping list</h2>
              <form onSubmit={handleFinished}>
                <div className="grid grid-cols-3 p-1">
                  <h3 className="w-28">Total Quantity</h3>
                  <h3 className="w-28">Unit</h3>
                  <h3 className="w-28">Ingredient</h3>
                </div>
                {groceryList.ingredients.map((ingr) => (
                  <div key={ingr._id} className="grid grid-cols-3 border-t p-1">
                    <div className="w-28">
                      <input
                        type="number"
                        name={ingr._id}
                        id={ingr._id}
                        step=".1"
                        value={
                          formValues[ingr._id] === undefined
                            ? ingr.quantity
                            : formValues[ingr._id]
                        }
                        min="0"
                        onChange={handleChange}
                        className="w-10 text-center shadow appearance-none border rounded py-0.5 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>

                    <p className="w-28">{ingr.ingredient.measure}</p>
                    <p className="w-28">{ingr.ingredient.name}</p>
                  </div>
                ))}
                <button className="my-2 py-1 px-2 button rounded-xl">
                  Finalize list
                </button>
              </form>
            </section>
          ) : (
            <section className="text-center">
              <h2 className="text-lg m-2">Consolidated shopping list</h2>
              <table>
                <thead>
                  <tr>
                    <th className="w-28 p-1">Quantity</th>
                    <th className="w-28">Unit</th>
                    <th className="w-28">Ingredient</th>
                  </tr>
                </thead>
                <tbody>
                  {groceryList.ingredients.map((ingr) => (
                    <tr key={ingr._id} className="border-t">
                      <td className="p-1">{ingr.quantity}</td>
                      <td>{ingr.ingredient.measure}</td>
                      <td>{ingr.ingredient.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {groceryList.finished && !groceryList.suggestions.length ? (
                <form onSubmit={handleSuggestions}>
                  <button className="my-2 py-1 px-2 button rounded-xl">
                    Get suggestions
                  </button>
                </form>
              ) : null}
            </section>
          )
        ) : null}
        {groceryList.suggestions.length ? (
          <section name="Suggested ingredients">
            <h2 className="text-lg m-2 text-center">Suggested ingredients</h2>
            <div className="flex flex-wrap justify-center w-80 md:w-[700px] lg:w-[1020px]">
              {groceryList.suggestions.map((suggestion) => (
                <SuggestedIngredient
                  key={suggestion.name}
                  ingredient={suggestion}
                />
              ))}
            </div>
          </section>
        ) : null}
        <section
          name="recipes"
          className="flex flex-col items-center text-center"
        >
          {groceryList.recipes.length ? (
            <div>
              <h2 className="text-lg m-2">Recipes</h2>
              <table>
                <thead>
                  <tr>
                    <th className="w-40 p-1">Name</th>
                    <th className="w-40">Category</th>
                    {!groceryList.finished ? <th className="w-12"></th> : null}
                  </tr>
                </thead>
                <tbody>
                  {groceryList.recipes.map((recipe) => (
                    <tr key={recipe._id} className="border-t">
                      <td>{recipe.name}</td>
                      <td>{recipe.category}</td>
                      {!groceryList.finished ? (
                        <td className="flex justify-center items-center">
                          <form
                            onSubmit={(e) => handleRemove(e, recipe._id)}
                            className="justify-center items-center p-1"
                          >
                            <button className=" hover:bg-gray-200 w-8 h-8 p-1 rounded-lg">
                              <img src="/trash.png" alt="Remove" />
                            </button>
                          </form>
                        </td>
                      ) : null}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}

          {!groceryList.finished ? (
            <Link
              to={`/groceries/${groceryList._id}/recipes`}
              className="self-center"
            >
              <button className="my-2 py-1 px-2 button rounded-xl">
                Add recipes
              </button>
            </Link>
          ) : null}
        </section>
        <button
          className="my-4 py-1 px-2 hover:bg-gray-200 hover:text-black rounded-xl"
          onClick={toggleModal}
        >
          Delete grocery list
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
              Are you sure you want to delete this grocery list?
            </h3>
            <div className="flex justify-around">
              <form onSubmit={handleDelete}>
                <button className="my-2 py-1 px-2 button rounded-xl">
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
        <h1 className="text-xl m-2">Grocery list not found</h1>
      </section>
    )
  ) : (
    <section name="Unauthorized" className="flex flex-col items-center mt-8">
      <h1 className="">Oops! You must be signed in to do that!</h1>
      <button
        onClick={() => navigate('/login')}
        className="my-2 py-1 px-2 button rounded-xl"
      >
        Sign In
      </button>
    </section>
  )
}

export default GroceryDetail
