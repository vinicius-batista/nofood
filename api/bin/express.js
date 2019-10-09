const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

//routers
const categoryRouter = require('../routes/category-router')
const productRouter = require('../routes/product-router')
const userRouter = require('../routes/user-router')
const orderRouter = require('../routes/order-router')

const app = express()

app.use(cors({ origin: '*' }))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: false }))

mongoose.connect('mongodb://localhost/nofoood', { useNewUrlParser: true })

app.use('/api/category', categoryRouter)
app.use('/api/product', productRouter)
app.use('/api/user', userRouter)
app.use('/api/order', orderRouter)

module.exports = app
