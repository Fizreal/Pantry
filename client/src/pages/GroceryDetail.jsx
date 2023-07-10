import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

const GroceryDetail = ({ groceries }) => {
  const [groceryList, setGroceryList] = useState(null)

  const { groceryId } = useParams()

  useEffect(() => {
    const selectRecipe = () => {
      if (groceries) {
        let selectGroceryList = groceries.find((groceryList) => {
          return groceryList._id === groceryId
        })
        setGroceryList(selectGroceryList)
      }
    }
    selectRecipe()
  }, [groceries, groceryId])

  return (
    <div>
      {groceryList ? (
        <div>
          <h1>{groceryList.date.slice(0, 10)}</h1>
          <p></p>
          {/* <Link to={`/recipes/${recipe._id}/ingredients`}> */}
          <button>Add Ingredients</button>
          {/* </Link> */}
        </div>
      ) : (
        <h1>No previous grocery lists</h1>
      )}
    </div>
  )
}

export default GroceryDetail
