const express = require("express")
const app = express()
const restaurantList = require("./restaurant.json")
const exphbs = require("express-handlebars")
const port = 3000

//express template engine
app.engine("handlebars", exphbs({defaultLayout: "main"}))
app.set("view engine", "handlebars")

//setting static files
app.use(express.static("public"))

//route setting
app.get("/", (req, res) => {
    res.render("index", {restaurants:restaurantList.results})
})

//params
app.get("/restaurant/:restaurant_id", (req, res)=> {
    const restaurants = restaurantList.results.filter((restaurant) => {
        return restaurant.id == req.params.restaurant_id
        
    })
    res.render("show", {restaurant:restaurants[0]})
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