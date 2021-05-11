const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')
const sortMethod = require('../../public/javascripts/sortMethod')

router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

// sort function
router.get('/sort', (req, res) => {
  const sortSelected = req.query.sort
  const sortRule = sortMethod(sortSelected)
  Restaurant.find()
    .lean()
    .sort(sortRule)
    .then((restaurants) => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

// search function
router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  return Restaurant.find({
    $or: [
      { name: { $regex: `${keyword}`, $options: '$i' } },
      { category: { $regex: `${keyword}`, $options: '$i' } }
    ]
  })
    .lean()
    .then(restaurants => res.render('index', { restaurants, keyword }))
    .catch(error => console.error(error))
})


module.exports = router
