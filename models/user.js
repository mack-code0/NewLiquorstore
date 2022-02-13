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

userSchema.methods.deleteFromCart = function(productId){
    let newCart = this.cart
    const productIndex = this.cart.findIndex(p=>p.productId.toString()===productId.toString())
    if(newCart[productIndex].quantity>1){
        newCart[productIndex].quantity --
    }else{
        newCart = this.cart.filter(p=>p.productId.toString()!==productId.toString())
    }
    this.cart = newCart
    return this.save()
}


userSchema.methods.getCart = function(){
    return this.populate("cart.productId", "imageurl description unitprice title")
    .then(user=>{
        return user.cart
    })
    .catch(err=>{
        console.log(err);
    })
}

module.exports = mongoose.model("User", userSchema)