
exports.addToCart = (req, res, next)=>{
    req.user.addToCart(req.body.productId)
    .then((result) => {
        return req.user.getCart()
        .then(topNavCart=>{
            res.json({mode: "Successful", totalCartQuantity: result.totalQuantity, topNavCart: topNavCart.slice(-3)})
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