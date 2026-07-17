import mongoose from "mongoose";
import bcrypt from "bcrypt"

interface IUser {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  provider: "local" | "google";
  createdAt: Date;
  updatedAt: Date;
  comparePassword(password: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: function() { return (this as any).provider === "local"; },
    select: false,
  },
  provider: {
    type: String,
    enum: ["local", "google"],
    default: "local",
  },
}, {
  timestamps: true,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return;
  }

  this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
}


const User = mongoose.model("User", userSchema);

export type { IUser };
export default User;