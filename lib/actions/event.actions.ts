"use server"

import { connectToDatabase } from "../mongodb/database"
import User from "../mongodb/database/models/user.model"
import Event from "../mongodb/database/models/event.model"
import { CreateEventParams } from "../types"
import { handleError } from "../utils"
import { revalidatePath } from "next/cache"

export const createEvent =async ({event,userId,path}:CreateEventParams) => {
    try {
        await connectToDatabase();
        console.log(`UserId:${userId}`)
        const organizer = await User.findById(userId);
        if (!organizer) {
            throw new Error('Organizer not found')
        } 
        console.log(`Event category: ${event.categoryId}`)
        const newEvent = await Event.create({
            ...event,
            category:event.categoryId,
            organizer:userId
        })
        revalidatePath(path)
        return JSON.parse(JSON.stringify(newEvent))
    } catch (error) {
        handleError(error)
    }
}