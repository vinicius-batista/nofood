const express = require('express')
const router = express.Router()
const userController = require('../controllers/user-controller')
const auth = require('../middlewares/authentication')

router.get('/', auth, userController.get)
router.get('/:id', auth, userController.getById)
router.post('/', userController.post)
router.post('/authenticate', userController.authenticate)
router.put('/:id', auth, userController.put)
router.delete('/:id', auth, userController.destroy)

module.exports = router
