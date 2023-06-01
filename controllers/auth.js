import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

export const signUp = asyncHandler(async (req, res, next) => {
  /* 
   Check if user exists (email) =>  have access to body of request [x]
    if exists return error [x]
    if not exists [x]
      secure password => hashing password [x]
      storing user [x]
      signing token [x]
      Return JWT [x]
  */
  const {
    body: { firstName, lastName, email, password }
  } = req;
  const found = await User.findOne({ email });
  if (found) throw new ErrorResponse('User already exists', 400);
  const hash = await bcrypt.hash(password, 5);
  const newUser = await User.create({ firstName, lastName, email, password: hash });
  const token = jwt.sign({ uid: newUser._id }, process.env.JWT_SECRET);
  res.json({ token });
});

export const signIn = asyncHandler(async (req, res, next) => {
  /* 
    Check if user exists [x]
      if not exists => return error [x]
      if exists [x]
        check if user password  === request password [x]
          if no match => return error [x]
          if match => sign token [x]
          return token [x]
  */
  const {
    body: { email, password }
  } = req;
  const found = await User.findOne({ email }).select('+password');
  if (!found) throw new ErrorResponse('User does not exist', 404);
  const match = await bcrypt.compare(password, found.password);
  if (!match) throw new ErrorResponse('Password is incorrect', 401);
  const token = jwt.sign({ uid: found._id }, process.env.JWT_SECRET);
  res.json({ token });
});

export const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.uid);
  res.json(user);
});
