const mongoose = require("mongoose")

const Schema = mongoose.Schema

const orderSchema = new Schema({
    items: [
        {
            product: {type: Object, required: true},
            quantity: {type: Number, required: true}
        }
    ],
    user: {
        email: {type: String, required: true},
        userid: {type: Schema.Types.ObjectId, required: true}
    }
})

module.exports = mongoose.model("Order", orderSchema)