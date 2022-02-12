exports.addToCart = (req, res, next)=>{
    req.user.addToCart(req.body.productId)
    .then((result) => {
        res.json({mode: "Successful", totalCartQuantity: result.totalQuantity})
    }).catch((err) => {
        res.json({error: "An error occured"})
    });
}