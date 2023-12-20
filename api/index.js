// The main Backend file
import express from "express";
import { config } from "dotenv";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/users.js";
import postRouter from "./routes/posts.js";
import { errorMiddleware } from "./middleware/error.js";
import database from "./utilities/database.js";
import imageUpload from "./utilities/imageUpload.js";
import path from "path";

const app = express();

//Environment Variable System
config({
    path: "./config.env"
});

//Backend Express.js Server
app.listen(process.env.PORT, () => {
    console.log(`Server started successfully at port - ${process.env.PORT}`);
});

//Database Connection
database();

//Upload Images
imageUpload(app);

//Middleware
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use(errorMiddleware);

//Uploaded Images are in Public Folder
app.use("/uploaded-images", express.static(path.join(path.resolve(),"/uploaded-images")));