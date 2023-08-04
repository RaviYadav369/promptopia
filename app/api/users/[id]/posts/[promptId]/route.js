import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export async function PATCH(request,{params}){
    try {
       await connectToDB()
       const {promptId} = params;
       const {prompts,tag} = request.json()
       const updateprompt = await Prompt.findOne({_id:promptId})

       updateprompt.prompt = prompts
       updateprompt.tag = tag

       const updatedPrompt = await updateprompt.save()

       return new Response(JSON.stringify(updatedPrompt),{status:200})

    } catch (error) {
        return new Response(error,{status:500})
    }
}

export async function DELETE(request,{params}){
    try {
        await connectToDB()
        await Prompt.findByIdAndDelete(params.promptId)
        return new Response("Prompt Deleted succesfully",{status:200})
        
    } catch (error) {
        return new Response(error,{status:500})
    }
}