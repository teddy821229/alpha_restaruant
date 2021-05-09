const mongoose = require('mongoose')
// db connection
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
// db checked
db.on('error', () => {
  console.log('mongodb ERROR')
})
db.once('open', () => {
  console.log('mongodb CONNECTED!')
})

module.exports = db
