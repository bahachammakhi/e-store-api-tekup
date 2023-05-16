import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
  },
  fullname: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: ["admin", "owner", "client"],
  },
  joinedAt: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

userSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) {
    console.log("Not modified");
    return next();
  }
  console.log("Hashing");
  // Hash the password with cost of 12
  let passwordNew = await bcrypt.hash(this.password, 12);
  console.log("Passwords updated", passwordNew, this.password);
  this.password = passwordNew;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
export default mongoose.model("User", userSchema);
