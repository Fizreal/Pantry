const router = require('express').Router()
const ingredientCtrl = require('../controllers/ingredients')
const middleware = require('../middleware')

router.get(
  '/',
  middleware.stripToken,
  middleware.verifyToken,
  ingredientCtrl.index
)
router.get(
  '/search',
  middleware.stripToken,
  middleware.verifyToken,
  ingredientCtrl.search
)
router.get(
  '/suggestions',
  middleware.stripToken,
  middleware.verifyToken,
  ingredientCtrl.suggestions
)

module.exports = router
