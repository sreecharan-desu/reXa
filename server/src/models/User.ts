import mongoose, { Schema, Document } from 'mongoose';
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  points: number;
  redeemedRewards: number;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  points: { type: Number, default: 0 },
  redeemedRewards: { type: Number, default: 0 },
}, {
  timestamps: true
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
