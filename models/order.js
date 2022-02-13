const mongoose = require("mongoose")

const Schema = mongoose.Schema

const orderSchema = new Schema({
    items: [
        {
            product: {type: Object, required: true},
            quantity: {type: Number, required: true}
        }
    ],
    userId: {
        email: {type: String, required: true},
        userId: {type: Schema.Types.ObjectId, required: true}
    }
})

module.exports = mongoose.model("Order", orderSchema)