import mongoose from 'mongoose';


let isConnected = false;

export const connectToDatabase = async () => {
    mongoose.set('strictQuery'); //to avoid warnings in the console

    if(isConnected){
        console.log('MongoDB is connected');
        return;
    }

    try{
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: process.env.MONGODB_URI,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        isConnected = true;
        console.log('MongoDB is connected');

    } catch(e){
        console.log('Error connecting to MongoDB');
        console.log(e);
    }
};