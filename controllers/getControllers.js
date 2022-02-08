exports.home = (req, res)=>{
    res.render("index", {path: "/"})
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