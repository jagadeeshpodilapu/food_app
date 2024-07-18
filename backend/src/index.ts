import express, { Request, Response } from "express";
import cloudinary from "cloudinary";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute";
import myRestaurantRoute from "./routes/MyRestaurantRoute";

mongoose.connect(process.env.MONGODB_CONNECTION as string).then(() => {
    console.log("Connected to Database");
});

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

const app = express();

app.use(express.json()); //convert any body to json
app.use(cors());

app.get("/health", async (req: Request, res: Response) => {
    res.send({ message: "Health OK!" });
});

app.use("/api/my/user", myUserRoute);
app.use("/api/my/restaurant", myRestaurantRoute);

app.listen(3000, () => {
    console.log("Server statrted on localhost:3000");
});
