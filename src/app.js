import express from 'express';
import connectDB from './config/db.js'

const PORT = 8080;

connectDB();


const app = express();
app.use(express.json());


app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));