//設定外部現成套現
const express = require("express")
const exphbs = require("express-handlebars")
const bodyParser = require("body-parser")
const methodOverride = require("method-override")

//引用自定義套件
const routes = require("./routes")
require("./config/mongoose")

//設定參數
const app = express()
const port = 3000

//SETTING
//模板套件hbs
app.engine("handlebars", exphbs({defaultLayout: "main"}))
app.set("view engine", "handlebars")

//靜態檔案設定
app.use(express.static("public"))

//set body-parser
app.use(bodyParser.urlencoded({ extended: true}))

//set method override
app.use(methodOverride("_method"))

//route setting
app.use(routes)

//start
app.listen(port, () => {
    console.log(`Express is listening on localhost: ${port}`)
})