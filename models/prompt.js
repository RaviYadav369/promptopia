import mongoose, { Schema,model,models } from "mongoose";

const promptSchema = new Schema({
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    prompt:{
        type:String,
        required:[true,"Prompt is Required"]
    },
    tag:{
        type:String,
        required:[true,"Tag is Required"]
    }
})

const Prompt = mongoose.models.Prompt || mongoose.model("Prompt", promptSchema)
export default Prompt