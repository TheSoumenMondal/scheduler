import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";

export async function POST(req: NextRequest) {
    await connectDB()
    const body = await req.json();
    // Start a session for transaction
    try {
        return NextResponse.json({
            success: true,
            message: "Faculty created successfully"
        });
    } catch (error) {

    }
}
