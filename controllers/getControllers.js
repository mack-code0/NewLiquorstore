const Product = require("./../models/product")
const getTotalCartQuantity = require("../utils/getTotalCartQuantity")

const ITEMS_PER_PAGE = 5

exports.home = (req, res, next) => {
    Product.find()
        .limit(8)
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

exports.products = (req, res, next) => {
    const page = typeof req.query.page === "undefined" ? 1 : req.query.page

    let totalNumOfProducts;

    Product.countDocuments()
        .then(numberOfProducts => {
            totalNumOfProducts = numberOfProducts
            return Product.find()
                .skip((page - 1) * ITEMS_PER_PAGE)
                .limit(ITEMS_PER_PAGE)
        })
        .then(products => {
            res.render("products", {
                path: "/products",
                pageTitle: "Products",
                products,
                currentPage: page,
                lastPage: Math.ceil(totalNumOfProducts / ITEMS_PER_PAGE),
                hasNextPage: page * ITEMS_PER_PAGE < totalNumOfProducts,
                hasPreviousPage: page > 1,
                numOfPages: Math.ceil(totalNumOfProducts / ITEMS_PER_PAGE)
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