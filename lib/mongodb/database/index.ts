import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI

let cached = (global as any).mongoose || {conn:null,promise:null}

//Tai sao phai cached: de moi lan server action goi len thi ko phai ket noi lai voi database


export const connectToDatabase = async () =>{
    if (cached.conn) return cached.conn;
    if (!MONGODB_URI) throw new Error('mongodb_uri is missing')

    cached.promise = cached.promise || mongoose.connect(MONGODB_URI,{
        dbName:'evently',
        bufferCommands:false
    })

    cached.conn = await cached.promise

    return cached.conn
}