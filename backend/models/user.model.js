import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minlength: [6, "Email must be at least 6 characters long"],
    maxlength: [50, "Email cannot exceed 50 characters"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

// 🔹 Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};



userSchema.methods.generateJWT = function () {
  return jwt.sign(
    { email: this.email }, 
    process.env.JWT_SECRET, 
    { expiresIn: "24h",}
  );
};

const User = mongoose.model("User", userSchema);

export default User;
