import mongoose from "mongoose"

export interface Subject extends mongoose.Document {
    name : string,
    faultyId : mongoose.Types.ObjectId[],
    department : mongoose.Types.ObjectId,
    totalHoursPerWeek : number,
    totalLecturesPerWeek : number,
    totalCredits : number,
}

const subjectSchema = new mongoose.Schema<Subject>({
    name : {
        type : String,
        required : true
    },
    faultyId : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'faculty'
    }],
    department : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'department'
    },
    totalHoursPerWeek : {
        type : Number,
        required : true
    },
    totalLecturesPerWeek : {
        type : Number,
        required : true
    },
    totalCredits : {
        type : Number,
        required : true 
    },

},{
    timestamps : true
})

const SubjectModel = mongoose.models.subject || mongoose.model<Subject>('subject', subjectSchema)

export default SubjectModel