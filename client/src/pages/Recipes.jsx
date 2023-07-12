import RecipeListCard from '../components/RecipeListCard'
import { Link } from 'react-router-dom'

const Recipes = ({ recipes }) => {
  return (
    <section name="recipes" className="flex flex-col items-center w-80">
      <Link to="/recipes/new" className="m-2">
        <button className="p-2 border rounded-xl">New recipe</button>
      </Link>
      <h1 className="text-xl m-2">Your Recipes:</h1>
      <div>
        {recipes.length ? (
          recipes.map((recipe) => (
            <RecipeListCard key={recipe._id} recipe={recipe} />
          ))
        ) : (
          <p>No recipes</p>
        )}
      </div>
    </section>
  )
}

export default Recipes
