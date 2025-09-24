import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Conectado a MongoDB Atlas");
  } catch (err) {
    console.error("❌ Error al conectar a MongoDB Atlas:", err.message);
    process.exit(1); // corta la app si no conecta
  }
};


export default connectDB;

