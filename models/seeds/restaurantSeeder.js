const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const db = require('../../config/mongoose')
const restaurantListOrigin = require('../../restaurant.json')

db.once('open', () => {
  const originListResults = restaurantListOrigin.results
  for (let i = 0; i < originListResults.length; i++) {
    Restaurant.create(originListResults[i])
  }
  console.log('done.')
})
