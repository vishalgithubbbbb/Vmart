import mongoose from "mongoose";

export const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongodb connected")

    } 
    catch(error){
        console.log("Error connecting to MongoDB:",error);
        process.exit(1); //Exit the process with failure

    }
}