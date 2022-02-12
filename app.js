const express = require('express')
const path = require('path')
const app = express()
const mongoose = require("mongoose")
const User = require("./models/user")
const rootDir = require("./utils/rootDir")
const GetRoutes = require("./routes/getRoutes")
const PostRoutes = require("./routes/postRoutes")


app.set("view engine", "ejs")


app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(rootDir, "public")))


app.use((req, res, next)=>{
    User.findById("62077cfe2611ecdb57abd217")
    .then(user=>{
        req.user = user
        next()
    })
})


// Routes
app.use(GetRoutes)
app.use(PostRoutes)


mongoose.connect("mongodb://127.0.0.1:27017/dashboard")
.then(result=>{
    User.findOne()
    .then(user=>{
        if(!user){
            const newUser = new User({name: "Macaulay", email: "mac@mail.com", cart: []})
            newUser.save()
        }
    })
    app.listen(9000)
})
.catch(err=>{
    console.log(err);
})