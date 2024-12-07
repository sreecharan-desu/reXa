import mongoose, { Schema, Document } from 'mongoose';

export interface ITransaction extends Document {
    fromUser: mongoose.Types.ObjectId;
    toUser: mongoose.Types.ObjectId;
    points: number;
    reward: mongoose.Types.ObjectId;
    type: 'redemption';
    createdAt: Date;
}

const transactionSchema = new Schema({
    fromUser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    toUser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    points: {
        type: Number,
        required: true
    },
    reward: {
        type: Schema.Types.ObjectId,
        ref: 'Reward',
        required: true
    },
    type: {
        type: String,
        enum: ['redemption'],
        default: 'redemption'
    }
}, {
    timestamps: true
});

export const Transaction = mongoose.model<ITransaction>('Transaction', transactionSchema); 