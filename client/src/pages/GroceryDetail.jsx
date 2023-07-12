import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  removeRecipe,
  deleteGroceryList
} from '../services/groceryListServices'

const GroceryDetail = ({ groceries, updateGroceries }) => {
  let navigate = useNavigate()
  const [groceryList, setGroceryList] = useState(null)

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

  const handleRemove = async (e, recipeId) => {
    e.preventDefault()
    await removeRecipe(groceryId, recipeId)
    updateRecipes()
  }

  const handleDelete = async (e) => {
    e.preventDefault()
    deleteGroceryList(groceryId)
    updateGroceries()
    navigate('/groceries')
  }

  return groceryList ? (
    <section name="grocery list" className="flex flex-col items-center w-80">
      <h1 className="text-xl m-2">{groceryList.date.slice(0, 10)}</h1>
      <p>Status: {groceryList.finished ? 'Complete' : 'Open'}</p>
      <p></p>
      <section name="ingredients" className="flex flex-col w-80">
        {/* <h2 className="text-lg m-2 self-center">Ingredients</h2>
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
        <Link to={`/groceries/${groceryList._id}/ingredients`} className="self-center">
          <button className="p-2 border rounded-xl">Add</button>
        </Link> */}
      </section>
      <form onSubmit={handleDelete}>
        <button>Delete grocery list</button>
      </form>
    </section>
  ) : (
    <section name="recipe" className="flex flex-col items-center w-80">
      <h1 className="text-xl m-2">Grocery list not found</h1>
    </section>
  )
}

export default GroceryDetail
