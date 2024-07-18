import { Request, Response } from "express";
import Restaurant from "../models/restaurent";
import cloudinary from "cloudinary";
import mongoose from "mongoose";

const createMyRestaurant = async (req: Request, res: Response) => {
  try {
    const existingRestaurent = await Restaurant.findOne({ user: req.userId });
    if (existingRestaurent) {
      return res
        .status(409)
        .json({ message: "User restaurant already exists" });
    }

    const imageUrl = await uploadImage(req.file as Express.Multer.File);
    const restaurant = new Restaurant(req.body);
    restaurant.imageUrl = imageUrl;
    restaurant.user = new mongoose.Types.ObjectId(req.userId);
    restaurant.lastUpdated = new Date();
    await restaurant.save();
    res.status(201).send(restaurant);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const uploadImage = async (file: Express.Multer.File) => {
    console.log(file);
  const image = file;
  const base64Image = Buffer.from(image.buffer).toString("base64");
  const dataURI = `data:${image.mimetype};base64,${base64Image}`;

  const uploadResponse = await cloudinary.v2.uploader.upload(dataURI, {
    resource_type: "auto",
  });
  return uploadResponse.url;
};

export default {
  createMyRestaurant,
};
