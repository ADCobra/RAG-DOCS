import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage extends Document {
  chatId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  content: string;
  role: 'user' | 'assistant';
  metadata?: {
    tokens?: number;
    model?: string;
    sources?: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema<IMessage>(
  {
    chatId: {
      type: Schema.Types.ObjectId,
      ref: 'Chat',
      required: [true, 'Chat ID is required'],
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      index: true,
    },
    content: {
      type: String,
      required: [true, 'Message content is required'],
      trim: true,
      maxlength: [5000, 'Message content cannot exceed 5000 characters'],
    },
    role: {
      type: String,
      enum: ['user', 'assistant'],
      required: [true, 'Role is required'],
      default: 'user',
    },
    metadata: {
      tokens: Number,
      model: String,
      sources: [{ file_name: String, page: Number }],
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
messageSchema.index({ chatId: 1, createdAt: -1 });
messageSchema.index({ userId: 1 });

const Message = mongoose.model<IMessage>('Message', messageSchema);

export default Message;
