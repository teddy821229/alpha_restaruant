const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const addnew = require('./modules/addnew')

router.use('/', home)
router.use('/restaurants', restaurants)
router.use('/addnew', addnew)

module.exports = router
