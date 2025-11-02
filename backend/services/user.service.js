import userModel from "../models/user.model.js";

export const createUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  // Create and save user (password auto-hashed by pre-save)
  const user = new userModel({ email, password });
  await user.save();

  return user;
};
