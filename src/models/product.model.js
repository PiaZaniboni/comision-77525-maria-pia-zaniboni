import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ["vinyl", "cd", "cassette", "equipment", "accessory"]
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  timestamps: true // guardar createdAt y updatedAt
});

export default mongoose.model("Product", productSchema);