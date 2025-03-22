import mongoose from "mongoose"

type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {}

export async function connectDB(): Promise<void> {
    if (connection.isConnected) {
        console.log("Already connected to Database.")
        return
    }
    try {
        const conn = await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI || "")
        connection.isConnected = conn.connections[0].readyState
        console.log("Connected to Database.")
    } catch (error) {
        console.log("Error connecting to DB :", error)
        process.exit(1)
    }
}