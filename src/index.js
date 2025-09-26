import app from './app.js';
import connectDB from './config/db.js';

const PORT = 8080;

connectDB();

app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));