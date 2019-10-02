const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/category-controller')
const auth = require('../middlewares/authentication')

router.get('/', auth, categoryController.get)
router.get('/:id', auth, categoryController.getById)
router.post('/', auth, categoryController.post)
router.put('/:id', auth, categoryController.put)
router.delete('/:id', auth, categoryController.destroy)

module.exports = router
