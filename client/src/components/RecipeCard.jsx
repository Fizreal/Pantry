import { Link } from 'react-router-dom'

const RecipeCard = ({ recipe }) => {
  return (
    <Link to={`/recipes/${recipe._id}`}>
      <div>
        <h1>{recipe.name}</h1>
        <h3>Category: {recipe.category}</h3>
      </div>
    </Link>
  )
}

export default RecipeCard
