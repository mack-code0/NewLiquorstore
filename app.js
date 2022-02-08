const express = require('express')
const path = require('path')
const app = express()
const mongoose = require("mongoose")

const rootDir = require("./utils/rootDir")

const GetRoutes = require("./routes/getRoutes")

app.set("view engine", "ejs")

app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(rootDir, "public")))


app.use(GetRoutes)

mongoose.connect("mongodb://127.0.0.1:27107/dashboard")
.then(result=>{
    console.log("connected");
    app.listen(9000)
})
.catch(err=>{
    console.log(err);
})