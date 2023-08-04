import Prompt from "@models/prompt"
import { connectToDB } from "@utils/database"


export async function GET(){
   await connectToDB()
    try {
        const prompts = await Prompt.find().populate('creator')
        return new Response(JSON.stringify(prompts),{status:200})
        
    } catch (error) {
        return new Response(error,{status:500})
    }
}