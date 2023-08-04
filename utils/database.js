import mongoose from "mongoose";

let isConnected =false;

export const connectToDB =async ()=>{
    mongoose.get('strictQuery', true);
    if(isConnected){
        console.log("Mongo db is Aleredy connected");
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName:"promptopia",
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        isConnected = true; 
        console.log("Mongodb connected");

    } catch (error) {
        console.log(error);
    }
}
