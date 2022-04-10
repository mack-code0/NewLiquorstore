const express = require('express')
require("dotenv").config()

const mongoose = require("mongoose")
const session = require("express-session")
const flash = require("connect-flash")
const csrf = require("csurf")
const MongoDbStore = require("connect-mongodb-session")(session)
const MONGODB_URI = process.env.DB_URI

const helmet = require('helmet')
const compression = require('compression')


const app = express()
app.use(helmet())
app.use(compression())

const Store = new MongoDbStore({
    uri: MONGODB_URI,
    collection: "sessions",
    expires: 24 * 2 * 60 * 60000 //2 days
})
const csrfProtection = csrf()


const rootDir = require("./utils/rootDir")
const path = require('path')

const User = require("./models/user")
const GetRoutes = require("./routes/getRoutes")
const PostRoutes = require("./routes/postRoutes")
const AuthRoutes = require("./routes/authRoutes")


app.set("view engine", "ejs")


app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(rootDir, "public")))
app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: false,
    store: Store
}))
app.use(flash())
app.use(csrfProtection)

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn
    res.locals.csrfToken = req.csrfToken()
    next()
})



app.use(async (req, res, next) => {
    if (!req.session.user) {
        return next()
    }

    try {
        const user = await User.findById(req.session.user._id)
        if (!user) {
            return next()
        }
        req.user = user
        next()
    } catch (error) {
        next(new Error("An error occured"))
    }
})

// Routes
app.use(AuthRoutes)
app.use(GetRoutes)
app.use(PostRoutes)

app.use((req, res, next) => {
    res.render("errors/404", {
        path: "/404",
        pageTitle: "Page Not Found"
    })
})

app.use((error, req, res, next) => {
    console.log(error);
    res.render("errors/500", {
        path: "/500",
        pageTitle: "Error"
    })
})


mongoose.connect(MONGODB_URI)
    .then(result => {
        app.listen(process.env.PORT || 9000)
    })
    .catch(err => {
        throw new Error("Error Occured")
    })