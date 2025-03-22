import { connectDB } from "@/lib/connectDB";
import { NextRequest, NextResponse } from "next/server";
import InstitutionModel from "@/models/institutionmodels";


export async function POST(req: NextRequest, res: NextResponse) {
    await connectDB();
    const body = await req.json();
    const { name, adminEmail, convexId } = body;
    const existingInstitute = await InstitutionModel.findOne({ convexId })
    if (existingInstitute) {
        return NextResponse.json({
            success: false,
            message: "Institute already exists"
        })
    }
    const newInstitute = await InstitutionModel.create({
        name,
        adminEmail,
        convexId
    })
    return NextResponse.json({
        success: true,
        newInstitute
    })
}

export async function PUT(req: NextRequest) {
    try {
        const { faculty, departmentarray, convexId } = await req.json();
        const institute = await InstitutionModel.findOneAndUpdate(
            { convexId },
            { 
            $set: {
                faculty,
                departments: departmentarray
            }
            },
            { new: true }
        );

        if (!institute) {
            return NextResponse.json({ 
            success: false, 
            message: "Institution not found" 
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            institute
        });

    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}