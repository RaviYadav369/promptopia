import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export async function GET(request, { params }) {
    await connectToDB()
    try {
        const getPrompt = await Prompt.findById({ _id: params.promptId })
        return new Response(JSON.stringify(getPrompt), { status: 200 })

    } catch (error) {
        return new Response(error, { status: 500 })
    }
}

export async function PATCH(request, { params }) {
    try {
        await connectToDB()
        const { promptId } = params;
        const { prompt, tag } = await request.json()
        const updateprompt = await Prompt.findById(promptId)

        updateprompt.prompt = prompt
        updateprompt.tag = tag

        const updatedPrompt = await updateprompt.save()

        return new Response(JSON.stringify(updatedPrompt), { status: 200 })

    } catch (error) {
        return new Response(error, { status: 500 })
    }
}

export async function DELETE(request, { params }) {
    try {
        await connectToDB()
        await Prompt.findByIdAndDelete(params.promptId)
        return new Response("Prompt Deleted succesfully", { status: 200 })

    } catch (error) {
        return new Response(error, { status: 500 })
    }
}