import express from "express";
import { PORT,mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import {book} from "./models/bookModel.js";
import bookRoutes from "./routes/bookRoutes.js";
import cors from "cors";

const app = express();

//middleware for pursing request body
app.use(express.json());

app.get('/',(req,res)=>{
    console.log(req)
    return res.status(234).send('welcome to the mern stack tuitorial');
});
//middleware to use cors policy
app.use(cors());
// option 2: Allow Custom Origins
// app.use(
//     cors({
//         origin: "http://localhost:3000",
//         methods: ["GET", "POST", "PUT", "DELETE"],
//         allowedHeaders: ["Content-Type"],
//     })
// );

app.use('/savebook',bookRoutes);


mongoose
  .connect(mongoDBURL)
  .then(()=>{
    console.log("Connected to MongoDB");
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
    })

  })
  .catch((error)=>{
      console.log(error);
  });