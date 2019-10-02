const express = require('express')
const router = express.Router()
const orderController = require('../controllers/order-controller')
const auth = require('../middlewares/authentication')

router.get('/', auth, orderController.get)
router.get('/:id', auth, orderController.getById)
router.post('/', auth, orderController.post)

module.exports = router
