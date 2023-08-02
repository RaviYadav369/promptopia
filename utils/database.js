import mongoose from "mongoose";

let isConnected =false;

export const connectToDB =async ()=>{
    mongoose.set('stringQuery', true);
    if(isConnected){
        console.log("Mongo db is Aleredy connected");
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName:"share_prompts",
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        isConnected = true; 
        console.log("Mongodb connected");

    } catch (error) {
        console.log(error);
    }
}
