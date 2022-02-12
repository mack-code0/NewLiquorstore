exports.addToCart = (req, res, next)=>{
    req.user.addToCart(req.body.productId)
    .then((result) => {
        res.json({mode: "Successful"})
    }).catch((err) => {
        
    });
}