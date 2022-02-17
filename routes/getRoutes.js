const router = require('express').Router()

const getController = require("../controllers/getControllers")


router.get('/' , getController.home)
router.get('/about' , getController.about)
router.get("/contact", getController.contact)
router.get("/products", getController.products)
router.get("/cart", getController.cart)
router.get("/gettopnavcart", getController.getTopNavCart)

module.exports  = router