import { Link } from 'react-router-dom'

const GroceryCard = ({ groceryList }) => {
  const date = groceryList.date.toJSON().slice(0, 10)

  return (
    <Link to={`/groceries/${groceryList._id}`}>
      <div>
        <h1>{date}</h1>
        <h3>Status: {groceryList.finished ? 'Complete' : 'Open'}</h3>
      </div>
    </Link>
  )
}

export default GroceryCard
