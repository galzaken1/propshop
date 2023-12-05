import express from 'express'
import cors from 'cors'
import productRoutes from './routes/productRoutes.js'
import connectDB from './config/db.js';
import dotenv from 'dotenv'
import usersRoute from './routes/usersRoute.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import cookieParser from 'cookie-parser';
dotenv.config();
const port = process.env.PORT || 5001; // Access environment variable PORT
//bodyparser

connectDB()
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(cors())
app.get('/', (req, res) => {
    res.send('Api is running...')
});
app.use('/api/products', productRoutes);
app.use('/api/users', usersRoute);
app.use(notFound);
app.use(errorHandler);
app.listen(port, () => {
    console.log('Server is running on port ' + port)
})
