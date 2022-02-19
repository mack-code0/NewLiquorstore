const express = require('express')

const mongoose = require("mongoose")
const session = require("express-session")
const flash = require("connect-flash")
const csrf = require("csurf")
const MongoDbStore = require("connect-mongodb-session")(session)
const MONGODB_URI = "mongodb://127.0.0.1:27017/dashboard"


const app = express()
const Store = new MongoDbStore({
    uri: MONGODB_URI,
    collection: "sessions"
})
const csrfProtection = csrf()


const rootDir = require("./utils/rootDir")
const path = require('path')

const User = require("./models/user")
const GetRoutes = require("./routes/getRoutes")
const PostRoutes = require("./routes/postRoutes")
const AuthRoutes = require("./routes/authRoutes")


app.set("view engine", "ejs")


app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(rootDir, "public")))
app.use(session({
    secret: "This is my secret",
    resave: false,
    saveUninitialized: false,
    store: Store
}))
app.use(csrfProtection)
app.use(flash())

app.use((req, res, next)=>{
    res.locals.isAuthenticated = req.session.isLoggedIn
    res.locals.csrfToken = req.csrfToken()
    next()
})

app.use((req, res, next)=>{
    if(!req.session.user){
        return next()
    }
    User.findById(req.session.user._id)
    .then((user) => {
        req.user = user
        next()
    }).catch((err) => {
        console.log(err);
    });
})

// Routes
app.use(AuthRoutes)
app.use(GetRoutes)
app.use(PostRoutes)


mongoose.connect(MONGODB_URI)
.then(result=>{
    app.listen(9000)
})
.catch(err=>{
    console.log(err);
})