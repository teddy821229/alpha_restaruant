//設定外部現成套現
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const exphbs = require("express-handlebars")
const bodyParser = require("body-parser")
const methodOverride = require("method-override")
const Restaurant = require("./models/restaurant")
const port = 3000

const routes = require("./routes")

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

//set method override
app.use(methodOverride("_method"))

//route setting
app.use(routes)

//params
app.get("/restaurants/:id", (req, res)=> {
    const id = req.params.id
    Restaurant.findById(id)
        .lean()
        .then(restaurant => res.render("show", {restaurant}))
        .catch(error => console.error(error))
})


//search -> querystring
app.get("/search", (req, res) => {
    const keyword = req.query.keyword
    return Restaurant.find({
        "$or": [
            {"name":{ $regex: `${keyword}`, $options: "i"}},
            {"category": { $regex: `${keyword}`, $options: "i"}}
        ]
    })
        .lean()
        .then(restaurants => res.render("index", {restaurants, keyword}))
})

//新增功能
app.get("/addnew", (req, res) => {
    return res.render("new")
})

app.post("/addnew", (req, res) => {
    const { name, name_en, category, image, location, phone, google_map, rating, description} = req.body
    //回傳資料
    return Restaurant.create({
        name,
        name_en,
        category,
        image,
        location,
        phone,
        google_map,
        rating,
        description
    })
        .then(() => res.redirect("/"))
        .catch(error => console.error(error))

})

//修改功能
//渲染畫面
app.get("/restaurants/:id/edit", (req, res) => {
    const id = req.params.id
    Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render("edit", {restaurant}))
    .catch(error => console.error(error))
})

//儲存修改資料
app.put("/restaurants/:id", (req, res) => {
    const id = req.params.id
    const { name, name_en, category, image, location, phone, google_map, rating, description} = req.body
    return Restaurant.findById(id)
        .then(restaurant => {
            restaurant.name = name
            restaurant.name_en = name_en
            restaurant.category = category
            restaurant.image = image
            restaurant.location = location
            restaurant.phone = phone
            restaurant.google_map = google_map
            restaurant.rating = rating
            restaurant.description = description
            return restaurant.save()
        })
        .then(() => res.redirect(`/restaurants/${id}`))
        .catch(error => console.error(error))

})

//刪除資料
app.delete("/restaurants/:id", (req, res) => {
    const id = req.params.id
    return Restaurant.findById(id)
        .then(restaurant => restaurant.remove())
        .then(() => res.redirect("/"))
        .catch(error => console.error(error))
})

//start
app.listen(port, () => {
    console.log(`Express is listening on localhost: ${port}`)
})