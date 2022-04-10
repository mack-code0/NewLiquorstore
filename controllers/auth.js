const bcryptjs = require("bcryptjs")
const User = require("../models/user")
const { validationResult } = require("express-validator")

exports.getLogin = (req, res, next) => {
    const error = req.flash("error")
    const errorMessage = error.length > 0 ? error : null

    const success = req.flash("success")
    const successMessage = success.length > 0 ? success : null
    res.render("auth/login", {
        totalCartQuantity: null,
        topNavCart: null,
        path: "/login",
        pageTitle: "Login",
        errorMessage: errorMessage,
        successMessage: successMessage,
        oldInput: { email: "", password: "" },
        validationErrors: []
    })
}

exports.getSignup = (req, res, next) => {
    const error = req.flash("error")
    const errorMessage = error.length > 0 ? error : null
    res.render("auth/signup", {
        totalCartQuantity: null,
        topNavCart: null,
        path: "/signup",
        pageTitle: "Signup",
        errorMessage: errorMessage,
        oldInput: { email: "", password: "", confirmPassword: "" },
        validationErrors: []
    })
}

exports.postLogin = async (req, res, next) => {
    const { email, password } = req.body

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).render("auth/login", {
            totalCartQuantity: null,
            topNavCart: null,
            path: "/login",
            errorMessage: errors.array()[0].msg,
            successMessage: "",
            oldInput: { email, password },
            validationErrors: errors.array()
        })
    }

    try {
        const user = await User.findOne({ email: email })
        if (!user) {
            req.flash("error", "Invalid email or password")
            return res.redirect("/login")
        }

        const doMatch = await bcryptjs.compare(password, user.password)
        if (!doMatch) {
            req.flash("error", "Invalid email or password")
            return res.redirect("/login")
        }

        req.session.isLoggedIn = true
        req.session.user = user
        req.session.save(err => {
            res.redirect("/")
        })
    } catch (error) {
        err(error, next)
    }
}

exports.postSignup = async (req, res, next) => {
    const { email, password, confirmPassword } = req.body

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).render("auth/signup", {
            totalCartQuantity: null,
            topNavCart: null,
            path: "/signup",
            pageTitle: "Signup",
            errorMessage: errors.array()[0].msg,
            oldInput: { email, password, confirmPassword },
            validationErrors: errors.array()
        })
    }

    try {
        const hashedPassword = await bcryptjs.hash(password, 12)
        const newUser = new User({ email, password: hashedPassword, cart: [] })
        await newUser.save()
        req.flash("success", "Successfully Registered!")
        res.redirect("/login")
    } catch (error) {
        err(error, next)
    }
}


exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        res.redirect("/login")
    })
}