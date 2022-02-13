exports.addToCart = (req, res, next)=>{
    req.user.addToCart(req.body.productId)
    .then((result) => {
        req.user.topNavCart()
        .then(topNavCart=>{
            res.json({mode: "Successful", totalCartQuantity: result.totalQuantity, topNavCart: topNavCart})
        })
    }).catch((err) => {
        res.json({error: "An error occured"})
    });
}