import express from "express";
import config from "./db/config.js";
import jwt from "jsonwebtoken";
import multer from 'multer'

import cors from 'cors';
import authRoutes from './routes2/authRoute.js';
// import userRoutes from './routes/users.js';
// import postRoutes from './routes/posts.js';
import cookieParser from 'cookie-parser';


const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb){
    cb(null, '../client/public/upload')
  },
  filename: function (req, file, cb){
    cb(null, Date.now()+file.originalname)
  }
})


const upload = multer({storage})

app.post('/api/upload', upload.single('file'), function(req, res){
  const file = req.file;
  res.status(200).json(file.filename)
})


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:5173'
  }));
  
app.use(cookieParser());
app.use("/api/auth", authRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/posts', postRoutes);

app.listen(config.port, () => {
  console.log(`Server running on ${config.url}`);
});

