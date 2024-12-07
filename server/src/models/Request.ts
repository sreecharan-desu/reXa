import mongoose, { Schema, Document } from 'mongoose';

export interface IRequest extends Document {
  reward: mongoose.Types.ObjectId;
  sender: mongoose.Types.ObjectId;
  receiver: mongoose.Types.ObjectId;
  status: 'pending' | 'accepted' | 'rejected';
  message?: string;
  createdAt: Date;
}

const RequestSchema = new Schema({
  reward: {
    type: Schema.Types.ObjectId,
    ref: 'Reward',
    required: true
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },
  message: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model<IRequest>('Request', RequestSchema); 