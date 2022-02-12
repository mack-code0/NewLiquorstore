const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    cart: [
        {
            productId: {type: mongoose.Types.ObjectId, ref: "Product", required: true},
            quantity: {type: Number, required: true}
        }
    ]
})

userSchema.methods.addToCart = function(productId){
    const emptyCart = this.cart
    const checkProductIndex = emptyCart.findIndex(p=>p.productId.toString()==productId.toString())
    if(checkProductIndex >= 0){
        emptyCart[checkProductIndex].quantity = emptyCart[checkProductIndex].quantity + 1
    }else{
        emptyCart.push({productId, quantity: 1})
    }
    this.cart = emptyCart
    return this.save()
}

module.exports = mongoose.model("User", userSchema)