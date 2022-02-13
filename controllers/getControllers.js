const Product = require("./../models/product")
const getTotalCartQuantity = require("../utils/getTotalCartQuantity")

exports.home = (req, res)=>{
    Product.find()
    .then(products=>{
        req.user.topNavCart()
        .then(topNavCart=>{
            res.render("index", {
                path: "/", products,
                totalCartQuantity: getTotalCartQuantity(req.user.cart),
                topNavCart: topNavCart.reverse()})
        })
    })
}

exports.about = (req, res)=>{
    res.render("about", {path: "/about"})
}

exports.contact = (req, res)=>{
    res.render("contact", {path: "/contact"})
}

exports.products = (req, res)=>{
    res.render("products", {path: "/products"})
}

exports.cart = (req, res)=>{
    Product.find()
    .then(products=>{
        req.user.topNavCart()
        .then(topNavCart=>{
            res.render("cart", {
                path: "/cart", products,
                totalCartQuantity: getTotalCartQuantity(req.user.cart),
                topNavCart: topNavCart.reverse()})
        })
    })
}