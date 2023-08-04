import { connectToDb } from "@utils/database"
import { ObjectId } from "mongodb"

import User from "@models/user"

export const GET = async (request, { params }) => {
    try {
        await connectToDb()
        const user = await User.find({_id: new ObjectId(params.id)})
        
        return new Response(JSON.stringify(user), {status: 200})
    } catch (error) {
        console.log(error)
        return new Response("Failed to fetch the user", {status: 500})
    }
}