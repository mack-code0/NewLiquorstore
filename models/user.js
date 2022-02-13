const mongoose = require("mongoose")
const Schema = mongoose.Schema

const getTotalCartQuantity = require("../utils/getTotalCartQuantity")

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
    const updatedCart = this.cart
    const checkProductIndex = updatedCart.findIndex(p=>p.productId.toString()==productId.toString())
    if(checkProductIndex >= 0){
        const productQuantity = updatedCart[checkProductIndex].quantity + 1
        updatedCart.splice(checkProductIndex, 1)
        updatedCart.push({productId, quantity: productQuantity})
    }else{
        updatedCart.push({productId, quantity: 1})
    }
    
    this.cart = updatedCart
    return this.save()
    .then(result=>{
        return {totalQuantity: getTotalCartQuantity(this.cart)}
    }).catch(err=>{
        console.log(err);
    })
}

userSchema.methods.topNavCart = function(){
    return this.populate("cart.productId", "title unitprice imageurl -_id")
    .then(user=>{
        return user.cart.slice(-3)
    })
    .catch(err=>{
        console.log(err);
    })
}

module.exports = mongoose.model("User", userSchema)