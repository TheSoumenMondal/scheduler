import mongoose, { Schema, Document } from "mongoose"

export interface Institution extends Document {
    name: string;
    adminEmail: string;
    convexId : string;
    faculty: mongoose.Types.ObjectId[];
    departments: mongoose.Types.ObjectId[];
    departmentYear : string;
}

const InstitutionSchema = new Schema<Institution>({
    name: {
        type: String,
        required: true
    },
    adminEmail: {
        type: String,
        required: true,
        unique: true
    },
    convexId : {
        type : String,
        required : true,
        unique : true
    },
    faculty: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'faculty'
    }],
    departments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'department'
    }]
}, {
    timestamps: true
})

const InstitutionModel = mongoose.models.institution as mongoose.Model<Institution> || mongoose.model<Institution>('institution', InstitutionSchema)

export default InstitutionModel