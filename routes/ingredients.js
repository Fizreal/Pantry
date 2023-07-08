const router = require('express').Router()
const ingredientCtrl = require('../controllers/ingredients')
const middleware = require('../middleware')

router.get('/', ingredientCtrl.index)
router.get('/search', ingredientCtrl.search)
router.get('/suggestions', ingredientCtrl.suggestions)

module.exports = router
