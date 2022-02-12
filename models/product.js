const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
    title: {type: String, required: true},
    quantity: {type: Number, required: true},
    unitprice: {type: Number, required: true},
    date: {type: String, required: true},
    description: {type: String, required: true},
    imageurl: {type: String, required: true},
    category: {type: String, required: true},
    tag: {type: String, required: true},
    oldprice: {type: String}
})


module.exports = mongoose.model("Product", productSchema)