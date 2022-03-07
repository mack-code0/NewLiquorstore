const Product = require("./../models/product")
const getTotalCartQuantity = require("../utils/getTotalCartQuantity")

exports.home = (req, res, next) => {
    Product.find()
        .then(products => {
            res.render("index", {
                path: "/",
                pageTitle: "LiquorStore",
                products
            })
        }).catch(err => {
            const error = new Error(err)
            error.httpStatusCode = 500
            next(error)
        })
}

exports.about = (req, res) => {
    res.render("about", {
        path: "/about",
        pageTitle: "About"
    })
}

exports.contact = (req, res) => {
    res.render("contact", {
        path: "/contact",
        pageTitle: "Contact"
    })
}

exports.products = (req, res) => {
    Product.find()
        .then(products => {
            res.render("products", {
                path: "/products",
                pageTitle: "Products",
                products
            })
        }).catch(err => {
            const error = new Error(err)
            error.httpStatusCode = 500
            next(error)
        })
}

exports.singleProduct = (req, res, next) => {
    Product.findById(req.body.productId)
        .then(product => {
            res.render("product-single", {
                path: "/products",
                pageTitle: product.title,
                product
            })
        }).catch(err => {
            const error = new Error(err)
            error.httpStatusCode = 500
            next(error)
        })
}

exports.cart = (req, res) => {
    req.user
        .populate("cart.productId", "imageurl description unitprice title")
        .then(user => {
            res.render("cart", {
                path: "/cart",
                pageTitle: "Cart",
                cart: user.cart
            })
        }).catch(err => {
            const error = new Error(err)
            error.httpStatusCode = 500
            next(error)
        })
}


exports.getTopNavCart = (req, res, next) => {
    req.user
        .populate("cart.productId", "imageurl description unitprice title -_id")
        .then(user => {
            res.json({
                topNavCart: user.cart.slice(-3),
                totalCartQuantity: getTotalCartQuantity(user.cart)
            })
        })
}