const Product = require("./../models/product")
const getTotalCartQuantity = require("../utils/getTotalCartQuantity")

exports.home = (req, res)=>{
    Product.find()
    .then(products=>{
        req.user.getCart()
        .then(topNavCart=>{
            res.render("index", {
                path: "/", products,
                totalCartQuantity: getTotalCartQuantity(req.user.cart),
                topNavCart: topNavCart.slice(-3).reverse()})
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
    req.user.getCart()
    .then(cart=>{
        res.render("cart", {
            path: "/cart",
            totalCartQuantity: null,
            cart: cart,
            topNavCart: null
        })
    }).catch(err=>{
        console.log(err);
    })
}