const express = require("express")
const Route = express.Router()

const PostController = require("./../controllers/postControllers")

Route.post("/addtocart", PostController.addToCart)
Route.post("/deletefromcart", PostController.deleteFromCart)

module.exports = Route