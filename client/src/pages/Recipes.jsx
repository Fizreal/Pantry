import RecipeCard from '../components/RecipeCard'
import { Link } from 'react-router-dom'

const Recipes = ({ recipes, setRecipe }) => {
  return (
    <div>
      <h1>Your Recipes:</h1>
      <Link to="/recipes/new">
        <button>New recipe</button>
      </Link>
      <div>
        {recipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </div>
  )
}

export default Recipes
