const router = require('express').Router()
const recipeCtrl = require('../controllers/recipes')
const middleware = require('../middleware')

router.get('/', middleware.stripToken, middleware.verifyToken, recipeCtrl.index)
router.post(
  '/create',
  middleware.stripToken,
  middleware.verifyToken,
  recipeCtrl.createRecipe
)
router.delete(
  '/:recipeId',
  middleware.stripToken,
  middleware.verifyToken,
  recipeCtrl.delete
)
router.put(
  '/:recipeId/add',
  middleware.stripToken,
  middleware.verifyToken,
  recipeCtrl.add
)
router.put(
  '/:recipeId/remove/:ingredientId',
  middleware.stripToken,
  middleware.verifyToken,
  recipeCtrl.remove
)

module.exports = router
