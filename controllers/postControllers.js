const Order = require("../models/order")
const err = require("../utils/error").error_500


exports.addToCart = async (req, res, next) => {
    try {
        const result = req.user.addToCart(req.body.productId)
        const user =  req.user.populate("cart.productId", "imageurl description unitprice title")
        res.json({ mode: "Successful", totalCartQuantity: result.totalQuantity, topNavCart: user.cart.slice(-3) })
    } catch (error) {
        err(error, next)
    }
}

exports.deleteFromCart = async (req, res, next) => {
    try {
        await req.user.deleteFromCart(req.body.productId)
        res.json({ mode: "Successful" })
    } catch (error) {
        err(error, next)
    }
}

exports.createOrder = async (req, res, next) => {
    try {
        const user = await req.user.populate("cart.productId")
        const newArr = user.cart.map(p => {
            return { product: { ...p.productId.toJSON() }, quantity: p.quantity }
        })
        const newOrder = new Order({ items: [...newArr], user: { email: user.email, userid: req.user } })
        await newOrder.save()
        req.user.cart = []
        await req.user.save()
        res.redirect("/")
    } catch (error) {
        err(error, next)
    }
}