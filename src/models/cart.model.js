import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    products : [
        {
            product: {
                type : mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantify: {
                type: Number,
                required: true,
                min: 1,
                default: 1
            }
        }
    ]
},
{
    timestamps : true
});


export default mongoose.model("Cart", cartSchema);