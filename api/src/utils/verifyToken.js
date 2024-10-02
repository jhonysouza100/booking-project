import jwt from "jsonwebtoken";
import {config} from "dotenv";
config();
import { createError } from "./error.js";
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if(!token) {
    return next(createError(401, "You are not authenticated"));
  }

  jwt.verify(token, `${process.env.JWT_SECRET}`, (err, decoded) => {
    
    if(err) return next(createError(403, "Token is not valid"));

    req.decoded = decoded;

    next(); // if always is OK, proced to continue
  })

}

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    // console.log(req.decoded) // jwtoken contains { id, isAdmin } signed
    if(req.decoded.id === req.params.id || req.decoded.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized"));
    }
  });
}

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    // console.log(req.decoded) // jwtoken contains { id, isAdmin } signed
    if(req.decoded.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not admin"));
    }
  });
}