"use server";

import { connectToDatabase } from "../mongodb/database";
import User from "../mongodb/database/models/user.model";
import Event from "../mongodb/database/models/event.model";
import { CreateEventParams, DeleteEventParams, GetAllEventsParams } from "../types";
import { handleError } from "../utils";
import { revalidatePath } from "next/cache";
import Category from "../mongodb/database/models/category.model";

const populateEvent = async (query: any) => {
  return query
    .populate({
      path: "organizer",
      model: User,
      select: "_id firstName lastName",
    })
    .populate({ path: "category", model: Category, select: "_id name" });
};

export const createEvent = async ({
  event,
  userId,
  path,
}: CreateEventParams) => {
  try {
    await connectToDatabase();
    console.log(`UserId:${userId}`);
    const organizer = await User.findById(userId);
    if (!organizer) {
      throw new Error("Organizer not found");
    }
    console.log(`Event category: ${event.categoryId}`);
    const newEvent = await Event.create({
      ...event,
      category: event.categoryId,
      organizer: userId,
    });
    revalidatePath(path);
    return JSON.parse(JSON.stringify(newEvent));
  } catch (error) {
    handleError(error);
  }
};

export const getEventById = async (eventId: string) => {
  try {
    await connectToDatabase();
    const event = await populateEvent(Event.findById(eventId));
    if (!event) {
      throw new Error("Could not find event");
    }
    return JSON.parse(JSON.stringify(event));
  } catch (error) {
    handleError(error);
  }
};
export const getAllEvents = async ({
  query,
  limit = 6,
  category,
  page,
}: GetAllEventsParams) => {
  try {
    await connectToDatabase();
    const conditions = {};
    const eventsQuery = Event.find(conditions)
      .sort({ createAt: "desc" })
      .skip(0)
      .limit(6);
    const events = await populateEvent(eventsQuery);
    const eventsCount = await Event.countDocuments(conditions);
    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPages: Math.ceil(eventsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
};

export const deleteEvent = async ({eventId, path}:DeleteEventParams) => {
  try {
await connectToDatabase()
const deletedEvent = await Event.findByIdAndDelete(eventId)
if (deletedEvent) revalidatePath(path)
  } catch(error){
    handleError(error)
  }
}
