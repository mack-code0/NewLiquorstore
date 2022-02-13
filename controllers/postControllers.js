const Order = require("../models/order")


exports.addToCart = (req, res, next)=>{
    req.user.addToCart(req.body.productId)
    .then((result) => {
        return req.user
        .populate("cart.productId", "imageurl description unitprice title")
        .then(user=>{
            res.json({mode: "Successful", totalCartQuantity: result.totalQuantity, topNavCart: user.cart.slice(-3)})
        })
    }).catch((err) => {
        res.json({error: "An error occured"})
    });
}

exports.deleteFromCart = (req, res, next)=>{
    req.user.deleteFromCart(req.body.productId)
    .then(result=>{
        res.json({mode: "Successful"})
    })
    .catch(err=>{
        res.json({mode: "An Error Occured"})
    })
}

exports.createOrder = (req, res, next)=>{
    req.user
    .populate("cart.productId")
    .then(user=>{
        const newArr = user.cart.map(p=>{
            return {product: {...p.productId.toJSON()}, quantity: p.quantity}
        })
        const newOrder = new Order({items: [...newArr], user: {email: user.email, userid: req.user}})
        return newOrder.save()
        .then(result=>{
            req.user.cart = []
            return req.user.save()
        })
    }).then(result=>{
        res.redirect("/")
    }).catch(err=>{
        console.log(err);
    })
}