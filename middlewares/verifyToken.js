import jwt from 'jsonwebtoken';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

const verifyToken = asyncHandler(async (req, res, next) => {
  /*
      Check if token is present in request [x]
          if not return error [x]
          if present
              verifyToken [x]
                  if invalid return error [x]
                  if valid 
                      create uid property in request [x]
                      next
     */

  const {
    headers: { authorization }
  } = req;
  if (!authorization) throw new ErrorResponse('Please login', 401);
  const decoded = jwt.verify(authorization, process.env.JWT_SECRET);
  req.uid = decoded.uid;
  next();
});

export default verifyToken;
