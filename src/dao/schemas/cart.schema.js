import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        default: 1
      }
    }
  ]
});

const cartModel = mongoose.model("Cart", cartSchema);
export default cartModel;
