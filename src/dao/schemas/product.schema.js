import mongoose from "mongoose"

export const collectionProduct = "Products"

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        required: false,
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    thumbnails: {
        type: Array,
        required: false
    },
    code: {
        type: String,
        required: true
    }
})

const productModel = mongoose.model(collectionProduct, productSchema)
export default productModel