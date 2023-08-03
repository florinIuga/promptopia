import { connectToDb } from "@utils/database"
import Prompt from "@models/prompt"

const handler = async (req, res) => {
    switch (req.method) {
        case 'POST':
            const {userId, prompt, tag } = await req.json()
            try {
                await connectToDb()
                const newPrompt = new Prompt({creator:  userId, prompt, tag})
            
                await newPrompt.save()
                return new Response(JSON.stringify(newPrompt), { status: 201 })
            } catch (error) {
                console.log(error)
                return new Response("Failed to create a new prompt", { status: 500 })
            }
           
        case 'GET':
            try {
                await connectToDb()
                const prompts = await Prompt.find({}).populate('creator')
                return new Response(JSON.stringify(prompts), {status: 200})
            } catch (error) {
                console.log(error)
                return new Response("Failed to fetch all prompts", {status: 500})
            }
    }
}

export {handler as GET, handler as POST }
