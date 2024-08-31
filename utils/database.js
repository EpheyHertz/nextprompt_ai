import mongoose from 'mongoose';
let isConnected = false;

export const connectToDB = async ()=>{
    mongoose.set('strictQuery',true);
    if(isConnected){
        console.log("MongoDB already connected")
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName:"nextprompt_ai",
            
            serverSelectionTimeoutMS: 30000, // 30 seconds
            socketTimeoutMS: 45000,   
           
        })
        isConnected=true;
        console.log("MongoDB connected")
    } catch (error) {
        console.error(error)
       
    }
}
