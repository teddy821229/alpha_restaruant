const express = require("express")
const app = express()
const mongoose = require("mongoose")
const exphbs = require("express-handlebars")
const bodyParser = require("body-parser")
const Restaurant = require("./models/restaurant")
const port = 3000

//db connection
mongoose.connect("mongodb://localhost/restaurant-list", { useNewUrlParser: true , useUnifiedTopology: true})
const db = mongoose.connection
//db checked
db.on("error", () => {
    console.log("mongodb ERROR")
})
db.once("open", () => {
    console.log("mongodb CONNECTED!")
})

//express template engine
app.engine("handlebars", exphbs({defaultLayout: "main"}))
app.set("view engine", "handlebars")

//setting static files
app.use(express.static("public"))

//setting body-parser
app.use(bodyParser.urlencoded({ extended: true}))

//route setting
app.get("/", (req, res) => {
    Restaurant.find()
        .lean()
        .then(restaurants => res.render("index", {restaurants}))
        .catch(error => console.error(error))
})

//params
app.get("/restaurant/:restaurant_id", (req, res)=> {
    const id = req.params.restaurant_id
    Restaurant.findById(id)
        .lean()
        .then(restaurant => res.render("show", {restaurant}))
        .catch(error => console.error(error))
})

//search -> querystring
app.get("/search", (req, res) => {
    const restaurants = restaurantList.results.filter((restaurant) => {
        return restaurant.name.toLocaleLowerCase().includes(req.query.keyword.toLocaleLowerCase()) || restaurant.category.toLocaleLowerCase().includes(req.query.keyword.toLocaleLowerCase())
    })
    res.render("index", {restaurants:restaurants, keyword:req.query.keyword})
})

//start
app.listen(port, () => {
    console.log(`Express is listening on localhost: ${port}`)
})