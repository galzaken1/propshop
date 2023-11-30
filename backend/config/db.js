import mongoose from "mongoose";
import dotenv from 'dotenv';
//dotenv.config();
//const mongoURL = process.env.MONGO_URL || null
//console.log(mongoURL)
const mongoURL = 'mongodb+srv://galzaken:11uda11k@cluster0.tbihnxv.mongodb.net/proshop'
//const mongoURI = 'mongodb+srv://galzaken:11uda11k@cluster0.tbihnxv.mongodb.net/?retryWrites=true&w=majority'




const connectDB = async () => {
    try {
        const conn = await mongoose.connect(mongoURL, { useNewUrlParser: true }, { useUnifiedTopology: true });
        console.log('MongoDB connected' + conn.connection.host)
    } catch (error) {
        console.log(error);
        process.exit(1)

    }
}
export default connectDB