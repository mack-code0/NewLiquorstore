const router = require('express').Router()

const authController = require("../controllers/auth")
const { check } = require("express-validator")
const User = require("../models/user")


router.get("/login", authController.getLogin)

router.get("/signup", authController.getSignup)

router.post("/login",
    check("email").isEmail().withMessage("Enter a valid Email!"),
    check("password").isLength({min: 1}).withMessage("Password's field must not be empty"),
    authController.postLogin)

router.post("/signup",
    check("email").isEmail().withMessage("Enter a valid Email!").custom((value, {req})=>{
        return User.findOne({email: value})
            .then(user=>{
            if(user){
                return Promise.reject("Email already exists. Please Log in!")
            }
        })
    }),
    check("password", "Password must contain numbers and leters and must be at least 5 characters").isLength({min: 5}).isAlphanumeric(),
    check("confirmPassword").custom((value, {req})=>{
        if(value!==req.body.password){
            throw new Error("Passwords do not match!")
        }
        return true
    }),
    authController.postSignup)

router.post("/logout", authController.postLogout)

module.exports = router