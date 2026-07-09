import mongoose, { Document, Schema } from 'mongoose';

export interface IChat extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  messageCount: number;
  documents: {
    _id: mongoose.Types.ObjectId;
    name: string;
  }[];
  metadata?: {
    totalTokensUsed?: number;
  };
  createdAt: Date;
  updatedAt: Date;
  lastMessageAt?: Date;
  isDeleted: boolean;
}

const chatSchema = new Schema<IChat>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Chat title is required'],
      trim: true,
      maxlength: [200, 'Chat title cannot exceed 200 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    documents: [
      {
        name: {
          type: String,
          required: [true, 'Document name is required'],
          trim: true,
        },
      },
    ],
    messageCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    metadata: {
      totalTokensUsed: Number,
    },
    lastMessageAt: Date,
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
chatSchema.index({ userId: 1, createdAt: -1 });
chatSchema.index({ userId: 1, isActive: 1 });
chatSchema.index({ userId: 1, lastMessageAt: -1 });

const Chat = mongoose.model<IChat>('Chat', chatSchema);

export default Chat;
