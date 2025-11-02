

import * as userService from '../services/user.service.js';
import { validationResult } from 'express-validator';
import userModel from "../models/user.model.js";
import redisClient from '../services/redis.service.js';

export const createUserController = async (req, res) => {
    console.log("Request Body:", req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await userService.createUser(req.body);
        
        const token =  user.generateJWT();

        res.status(201).json({user, token});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

export const loginUserController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const email = req.body.email.toLowerCase();
    const { password } = req.body;

    const user = await userModel.findOne({ email }).select('+password');
    if (!user || !(await user.isValidPassword(password))) {
      return res.status(401).json({ errors: [{ msg: 'Invalid credentials' }] });
    }

    const token = user.generateJWT();
    const { password: _, ...userData } = user.toObject();

    res.status(200).json({ user: userData, token });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const profileController = async (req, res) => {
    console.log(req.user);

    res.status(200).json({
        user: req.user
    });
};

export const logoutController = async (req, res) => {
    try {
        const token = req.cookies.token || req.headers?.authorization?.split(" ")[1];

        // mark token as logged out in redis with 24h expiration
        await redisClient.set(token, 'logout', 'EX', 60 * 60 * 24);

        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
};