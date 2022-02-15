const User = require("../models/user")

exports.getLogin = (req, res, next)=>{
    res.render("login", {
        totalCartQuantity: null,
        topNavCart: null,
        path: "/login",
        isAuthenticated: false
    })
}

exports.postLogin = (req, res, next)=>{
    User.findById("62077cfe2611ecdb57abd217")
    .then(user=>{
        console.log(user);
        req.session.user = user
        req.session.isLoggedIn = true
        req.session.save(err=>{
            res.redirect("/")
        })
    }).catch(err=>{
        res.redirect("/")
    })
}