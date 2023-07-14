import { Link } from 'react-router-dom'

const GroceryListCard = ({ groceryList }) => {
  const date = groceryList.date.slice(0, 10)

  return (
    <Link to={`/groceries/${groceryList._id}`}>
      <div className="p-3 border m-2 w-80 rounded-lg text-center card shadow">
        <h2 className="text-lg">{date}</h2>
        <p>Status: {groceryList.finished ? 'Complete' : 'Open'}</p>
      </div>
    </Link>
  )
}

export default GroceryListCard
