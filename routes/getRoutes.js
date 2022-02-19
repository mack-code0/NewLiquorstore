const router = require('express').Router()

const getController = require("../controllers/getControllers")
const isAuth = require("../middleware/isAuth")


router.get('/' , getController.home)
router.get('/about' , getController.about)
router.get("/contact", getController.contact)
router.get("/products", getController.products)
router.get("/cart", isAuth, getController.cart)
router.get("/gettopnavcart", isAuth, getController.getTopNavCart)

module.exports  = router