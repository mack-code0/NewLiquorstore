const express = require("express")
const Route = express.Router()

const PostController = require("./../controllers/postControllers")
const isAuth = require("../middleware/isAuth")

Route.post("/addtocart", isAuth, PostController.addToCart)
Route.post("/deletefromcart", isAuth, PostController.deleteFromCart)
Route.post("/createorder", isAuth, PostController.createOrder)

module.exports = Route