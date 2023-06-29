import express from "express";
import config from "./db/config.js";
import jwt from "jsonwebtoken";

import cors from 'cors';
import authRoutes from './routes2/authRoute.js';
import postRoutes from './routes2/postRoute.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:5173'
  }));

// jwt middleware
app.use((req, res, next) => {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(" ")[0] === "JWT") {
    jwt.verify(req.headers.authorization.split(" ")[1], config.jwt_secret, (err, decode) => {
      if (err) return req.user = undefined;
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});

  
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/posts", postRoutes);

app.listen(config.port, () => {
  console.log(`Server running on ${config.url}`);
});

