const express = require("express")
const Route = express.Router()

const PostController = require("./../controllers/postControllers")

Route.post("/addtocart", PostController.addToCart)
Route.post("/deletefromcart", PostController.deleteFromCart)
Route.post("/createorder", PostController.createOrder)

module.exports = Route