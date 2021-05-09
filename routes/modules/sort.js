const express = require("express")
const router = express.Router()

const Restaurant = require("../../models/restaurant")
const sortMethod = require("../../public/javascripts/sortMehtod")

router.get("/", (req, res) => {
    const sortSelected = req.query.sort
    const sortRule = sortMethod(sortSelected)
    Restaurant.find()
        .lean()
        .sort(sortRule)
        .then((restaurants) => res.render("index", {restaurants}))
        .catch(error => console.error(error))
})

module.exports = router