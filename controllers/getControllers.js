const Product = require("./../models/product")

exports.home = (req, res)=>{
    Product.find()
    .then(products=>{
        let totalCartQuantity = 0;
        req.user.cart.forEach(product => {
            totalCartQuantity = totalCartQuantity + product.quantity
        });

        res.render("index", {path: "/", products, totalCartQuantity})
    })
}

exports.about = (req, res)=>{
    res.render("about", {path: "/about"})
}

exports.contact = (req, res)=>{
    res.render("contact", {path: "/contact"})
}

exports.products = (req, res)=>{
    res.render("products", {path: "/products"})
}

exports.cart = (req, res)=>{
    res.render("cart", {path: "/cart"})
}