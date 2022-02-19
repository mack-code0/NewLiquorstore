const bcryptjs = require("bcryptjs")
const User = require("../models/user")

exports.getLogin = (req, res, next)=>{
    const error = req.flash("error")
    const errorMessage = error.length>0?error:null
    res.render("auth/login", {
        totalCartQuantity: null,
        topNavCart: null,
        path: "/login",
        errorMessage: errorMessage
    })
}

exports.getSignup = (req, res, next)=>{
    const error = req.flash("error")
    const errorMessage = error.length>0?error:null
    res.render("auth/signup", {
        totalCartQuantity: null,
        topNavCart: null,
        path: "/signup",
        errorMessage: errorMessage
    })
}

exports.postLogin = (req, res, next)=>{
    const {email, password} = req.body
    User.findOne({email: email})
    .then(user=>{
        if(!user){
        req.flash("error", "Invalid email or password")
        return res.redirect("/login")
        }

        bcryptjs.compare(password, user.password)
        .then(doMatch=>{
        if(!doMatch){
            req.flash("error", "Invalid email or password")
            return res.redirect("/login")
        }

        req.session.isLoggedIn = true
        req.session.user = user
        req.session.save(err=>{
            res.redirect("/")
        })
        })
    }).catch(err=>{
        res.redirect("/")
    })
}

exports.postSignup = (req, res, next)=>{
    const {email, password, confirmPassword} = req.body
    User.findOne({email: email})
    .then(user=>{
        if(user){
            req.flash("error", "Email is already registered! Please try another email")
            return res.redirect("/signup")
        }

        bcryptjs.hash(password, 12)
        .then(hashedPassword=>{
            const newUser = new User({email, password: hashedPassword, cart: []})  
            return newUser.save()
        })
        .then(result=>{
            res.redirect("/login")
        })
    })  
    .catch(err=>console.log(err))
}

exports.postLogout = (req, res, next)=>{
    req.session.destroy(err=>{
        res.redirect("/")
    })
}