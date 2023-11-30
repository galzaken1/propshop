import express from 'express'
import cors from 'cors'
import productRoutes from './routes/productRoutes.js'
import connectDB from './config/db.js';
import dotenv from 'dotenv'
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
dotenv.config();
const port = process.env.PORT || 5001; // Access environment variable PORT

connectDB()
const app = express();
app.use(cors())
app.get('/', (req, res) => {
    res.send('Api is running...')
});
app.use('/api/products', productRoutes);
app.use(notFound);
app.use(errorHandler);
app.listen(port, () => {
    console.log('Server is running on port ' + port)
})
