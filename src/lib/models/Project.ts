import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  propertyAddress: string;
  propertyCity: string;
  propertyState: string;
  propertyZip: string;
  budget: number;
  timeline: string;
  projectType: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  owner: mongoose.Types.ObjectId;
  contractor?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
    },
    propertyAddress: {
      type: String,
      required: [true, 'Property address is required'],
    },
    propertyCity: {
      type: String,
      required: [true, 'Property city is required'],
    },
    propertyState: {
      type: String,
      required: [true, 'Property state is required'],
    },
    propertyZip: {
      type: String,
      required: [true, 'Property zip code is required'],
    },
    budget: {
      type: Number,
      required: [true, 'Budget is required'],
    },
    timeline: {
      type: String,
      required: [true, 'Timeline is required'],
    },
    projectType: {
      type: String,
      required: [true, 'Project type is required'],
    },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed', 'cancelled'],
      default: 'pending',
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Project owner is required'],
    },
    contractor: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema); 