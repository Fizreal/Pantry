const router = require('express').Router()
const groceryListCtrl = require('../controllers/groceryLists')
const middleware = require('../middleware')

router.get('/', groceryListCtrl.index)
router.get('/:groceryId', groceryListCtrl.show)
router.post('/create', groceryListCtrl.create)
router.put('/:groceryId/add/:recipeId', groceryListCtrl.add)
router.put('/:groceryId/remove/:recipeId', groceryListCtrl.remove)
router.delete('/:groceryId/delete', groceryListCtrl.delete)
router.put('/:groceryId/compile', groceryListCtrl.compile)
router.put('/:groceryId/finished', groceryListCtrl.finished)

module.exports = router
