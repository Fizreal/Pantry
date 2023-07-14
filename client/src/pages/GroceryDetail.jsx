import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  removeRecipe,
  deleteGroceryList,
  compileGroceries
} from '../services/groceryListServices'

const GroceryDetail = ({ groceries, updateGroceries, user }) => {
  let navigate = useNavigate()
  const [groceryList, setGroceryList] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const { groceryId } = useParams()

  useEffect(() => {
    const selectGroceryList = () => {
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
    await compileGroceries(groceryId)
    updateGroceries()
  }

  return user ? (
    groceryList ? (
      <section name="grocery list" className="flex flex-col items-center mt-8">
        <h1 className="text-2xl m-2">{groceryList.date.slice(0, 10)}</h1>
        <p>Status: {groceryList.finished ? 'Complete' : 'Open'}</p>
        {groceryList.ingredients.length ? (
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
          </section>
        ) : null}
        <section
          name="recipes"
          className="flex flex-col items-center text-center"
        >
          {groceryList.recipes.length ? (
            <div>
              <form onSubmit={handleCompile}>
                <button className="my-2 py-1 px-2 button rounded-xl">
                  Generate grocery list
                </button>
              </form>
              <h2 className="text-lg m-2">Recipes</h2>
              <table>
                <thead>
                  <tr>
                    <th className="w-40 p-1">Name</th>
                    <th className="w-40">Category</th>
                    <th className="w-12"></th>
                  </tr>
                </thead>
                <tbody>
                  {groceryList.recipes.map((recipe) => (
                    <tr key={recipe._id} className="border-t">
                      <td>{recipe.name}</td>
                      <td>{recipe.category}</td>
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
          <Link
            to={`/groceries/${groceryList._id}/recipes`}
            className="self-center"
          >
            <button className="my-2 py-1 px-2 button rounded-xl">
              Add recipes
            </button>
          </Link>
        </section>
        <button
          className="my-2 py-1 px-2 hover:bg-gray-200 hover:text-black rounded-xl"
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
