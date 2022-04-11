const Product = require("./../models/product")
const Order = require("./../models/order")
const getTotalCartQuantity = require("../utils/getTotalCartQuantity")
const err = require("../utils/error").error_500

const ITEMS_PER_PAGE = 6

exports.home = async (req, res, next) => {
    try {
        const products = await Product.find().limit(9)
        res.render("index", {
            path: "/",
            pageTitle: "LiquorStore",
            products
        })
    } catch (error) {
        err(error, next)
    }
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

exports.products = async (req, res, next) => {
    const page = typeof req.query.page === "undefined" ? 1 : req.query.page
    const category = new RegExp(req.query.category, "i")
    try {
        const totalNumOfProducts = await Product.countDocuments({ category })
        const products = await Product.find({ category }).skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE)
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
    } catch (error) {
        err(error, next)
    }
}

exports.singleProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.productId)
        res.render("product-single", {
            path: "/products",
            pageTitle: product.title,
            product
        })
    } catch (error) {
        err(error, next)
    }
}

exports.cart = async (req, res) => {
    try {
        const user = await req.user.populate("cart.productId", "imageurl description unitprice title")
        res.render("cart", {
            path: "/cart",
            pageTitle: "Cart",
            cart: user.cart
        })
    } catch (error) {
        err(error, next)
    }
}


exports.getTopNavCart = async (req, res, next) => {
    try {
        const user = await req.user.populate("cart.productId", "imageurl description unitprice title -_id")
        res.json({
            topNavCart: user.cart.slice(-3),
            totalCartQuantity: getTotalCartQuantity(user.cart)
        })
    } catch (error) {
        err(error, next)
    }
}


exports.getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ "user.userId": req.user._id })
        res.render("order1", {
            path: "/orders",
            pageTitle: "Orders",
            orders
        })
    } catch (error) {
        err(error, next)
    }
}
