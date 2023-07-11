import { Link } from 'react-router-dom'

const RecipeCard = ({ recipe }) => {
  return (
    <Link to={`/recipes/${recipe._id}`}>
      <div className="p-3 border m-2 w-80 rounded-lg text-center">
        <h2 className="text-lg">{recipe.name}</h2>
        <p>Category: {recipe.category}</p>
      </div>
    </Link>
  )
}

export default RecipeCard
