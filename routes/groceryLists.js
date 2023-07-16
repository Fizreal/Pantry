const router = require('express').Router()
const groceryListCtrl = require('../controllers/groceryLists')
const middleware = require('../middleware')

router.get(
  '/',
  middleware.stripToken,
  middleware.verifyToken,
  groceryListCtrl.index
)
router.post(
  '/create',
  middleware.stripToken,
  middleware.verifyToken,
  groceryListCtrl.create
)
router.put(
  '/:groceryId/add/:recipeId',
  middleware.stripToken,
  middleware.verifyToken,
  groceryListCtrl.add
)
router.put(
  '/:groceryId/remove/:recipeId',
  middleware.stripToken,
  middleware.verifyToken,
  groceryListCtrl.remove
)
router.delete(
  '/:groceryId',
  middleware.stripToken,
  middleware.verifyToken,
  groceryListCtrl.delete
)
router.put(
  '/:groceryId/compile',
  middleware.stripToken,
  middleware.verifyToken,
  groceryListCtrl.compile
)
router.put(
  '/:groceryId/finished',
  middleware.stripToken,
  middleware.verifyToken,
  groceryListCtrl.finished
)

router.put(
  '/:groceryId/suggestions',
  middleware.stripToken,
  middleware.verifyToken,
  groceryListCtrl.suggestions
)

router.put('/:groceryId/addSuggestion', groceryListCtrl.addSuggestion)

module.exports = router
