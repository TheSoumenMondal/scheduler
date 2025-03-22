import mongoose, { Schema, Document } from 'mongoose';

interface Faculty extends Document {
  name: string;
  email: string;
  password: string;
  department: string;
  institutionId: mongoose.Types.ObjectId;
  subjectExpert: mongoose.Types.ObjectId[];
}

const FacultySchema = new Schema<Faculty>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  institutionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'institution',
    required: true
  },
  password: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  subjectExpert: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'subject',
    required: true
  }]
}, {
  timestamps: true
});

const FacultyModel = mongoose.models.faculty as mongoose.Model<Faculty> || mongoose.model('faculty', FacultySchema);
export default FacultyModel;