import mongoose from 'mongoose';

//connect db 
const connectDB= async ()=>{
    mongoose.connection.on('connected', () => {
        console.log('MongoDB connected');
    });
    await mongoose.connect(`${process.env.MONGO_URI}/vidyakosh`);
}

export default connectDB;
