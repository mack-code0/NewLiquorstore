const Product = require("./../models/product")
const getTotalCartQuantity = require("../utils/getTotalCartQuantity")

exports.home = (req, res, next)=>{
    Product.find()
    .then(products=>{
        res.render("index", {
            path: "/",
            products
        })
    })
    .catch(err=>{
        console.log(err);
    })
}

exports.about = (req, res)=>{
    res.render("about", {
        path: "/about"
    })
}

exports.contact = (req, res)=>{
    res.render("contact", {
        path: "/contact"
    })
}

exports.products = (req, res)=>{
    Product.find()
    .then(products=>{
        res.render("products", {
            path: "/products",
            products
        })
    })
    .catch(err=>{
        console.log(err);
    })
}

exports.singleProduct = (req, res, next)=>{
    Product.findById(req.body.productId)
    .then(product=>{
        res.render("product-single", {
            path: "/products",
            product
        })
    }).catch(err=>{
        console.log(err);
    })
}

exports.cart = (req, res)=>{
    req.user
    .populate("cart.productId", "imageurl description unitprice title")
    .then(user=>{
        res.render("cart", {
            path: "/cart",
            cart: user.cart
        })
    }).catch(err=>{
        console.log(err);
    })
}


exports.getTopNavCart = (req, res, next)=>{
    if(req.session.user){
        req.user
        .populate("cart.productId", "imageurl description unitprice title -_id")
        .then(user=>{
            res.json({
                topNavCart: user.cart.slice(-3),
                totalCartQuantity: getTotalCartQuantity(user.cart)
            })
        })
    }else{
        res.json({error: "An Error Occured"})
    }
}