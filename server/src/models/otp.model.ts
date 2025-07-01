import mongoose, { Schema, Document } from 'mongoose';

export interface IOtp extends Document {
    email: string;
    otp: string;
    expiresAt: Date;
}

const otpSchema = new Schema({
    email: {
        type: String,
        required: true,
        index: true
    },
    otp: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true,
        index: { expires: '10m' } // Auto-remove after 10 minutes
    }
}, {
    timestamps: true
});

export const Otp = mongoose.model<IOtp>('Otp', otpSchema);