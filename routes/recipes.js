const router = require('express').Router()
const recipeCtrl = require('../controllers/recipes')
const middleware = require('../middleware')

router.get('/', recipeCtrl.index)
router.get('/:recipeId', recipeCtrl.show)
router.post('/create', recipeCtrl.createRecipe)
router.put('/:recipeId/add', recipeCtrl.add)

module.exports = router
