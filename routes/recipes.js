const router = require('express').Router()
const recipeCtrl = require('../controllers/recipes')
const middleware = require('../middleware')

router.get('/', recipeCtrl.index)
router.get('/:recipeId', recipeCtrl.show)
router.post('/create', recipeCtrl.createRecipe)
router.delete('/:recipeId', recipeCtrl.delete)
router.put('/:recipeId/add', recipeCtrl.add)
router.put('/:recipeId/remove/:ingredientId', recipeCtrl.remove)

module.exports = router
