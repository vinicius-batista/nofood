const express = require('express')
const router = express.Router()
const productController = require('../controllers/product-controller')
const auth = require('../middlewares/authentication')

router.get('/', auth, productController.get)
router.get('/:id', auth, productController.getById)
router.get('/category/:id', auth, productController.getByCategoryId)
router.post('/', auth, productController.post)
router.put('/:id', auth, productController.put)
router.delete('/:id', auth, productController.destroy)

module.exports = router
