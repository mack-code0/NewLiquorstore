const Product = require("./../models/product")
const getTotalCartQuantity = require("../utils/getTotalCartQuantity")

exports.home = (req, res)=>{
    Product.find()
    .then(products=>{
        let cart;
        if(req.session.user){
            req.user.populateCart()
            .then(us=>{
                console.log(us);
            })
        }
        console.log("----------------");
        console.log(req.session.user)
        console.log(cart);
        console.log("----------------");
        res.render("index", {
                path: "/", products,
                totalCartQuantity: getTotalCartQuantity(cart),
                topNavCart: cart.slice(-3).reverse(),
                isAuthenticated: req.session.isLoggedIn
        })
    })
}

exports.about = (req, res)=>{
    res.render("about", {
        path: "/about",
        isAuthenticated: req.session.isLoggedIn
    })
}

exports.contact = (req, res)=>{
    res.render("contact", {
        path: "/contact",
        isAuthenticated: req.session.isLoggedIn
    })
}

exports.products = (req, res)=>{
    res.render("products", {
        path: "/products",
        isAuthenticated: req.session.isLoggedIn
    })
}

exports.cart = (req, res)=>{
    req.user
    .populate("cart.productId", "imageurl description unitprice title")
    .then(user=>{
        res.render("cart", {
            path: "/cart",
            totalCartQuantity: null,
            cart: user.cart,
            topNavCart: null,
            isAuthenticated: req.session.isLoggedIn
        })
    }).catch(err=>{
        console.log(err);
    })
}