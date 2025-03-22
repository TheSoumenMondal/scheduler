import mongoose, { Schema, Document } from "mongoose";

export interface department extends Document {
    name: string
    totalLabs: number
    facultyNumber: number
    numberOfSections: number
    subject: mongoose.Types.ObjectId[]
}

const departmentSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    totalLabs: {
        type: Number,
        required: true,
        min: 0
    },
    facultyNumber: {
        type: Number,
        required: true,
        min: 1
    },
    numberOfSections: {
        type: Number,
        required: true,
        min: 1
    },
    subject: [{
        type: Schema.Types.ObjectId,
        ref: 'subject',
        required: true
    }]
});


const DepartmentModel = mongoose.models.department || mongoose.model<department>('department', departmentSchema);
export default DepartmentModel;
