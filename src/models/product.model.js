import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  code: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: Boolean,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ["vinyl", "cd", "cassette", "equipment", "accessory"]
  },
  thumbnails: {
    type: [String],
    default: []
  }
}, {
  timestamps: true // guardar createdAt y updatedAt
});

export default mongoose.model("Product", productSchema);