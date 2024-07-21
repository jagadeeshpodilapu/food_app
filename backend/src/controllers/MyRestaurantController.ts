import { Request, Response } from "express";
import Restaurant from "../models/restaurent";
import cloudinary from "cloudinary";
import mongoose from "mongoose";


const  getMyRestaurant=async(req:Request,res:Response)=>{

  try {
    const restaurant=await Restaurant.findOne({user:req.userId});

    if(!restaurant){
      return res.status(404).json({message:"restaurant not found"});
    }

    res.json(restaurant);
    
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"Error fetching restaurant"});
  }

}

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

const uploadImage = async (file: Express.Multer.File):Promise<string> => {
  try {
    const base64Image = Buffer.from(file.buffer).toString("base64");
    const dataURI = `data:${file.mimetype};base64,${base64Image}`;

    const uploadResponse = await cloudinary.v2.uploader.upload(dataURI, {
      resource_type: "auto",
    });

    return uploadResponse.secure_url;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw new Error("Image upload failed");
  }
};

export default {
  getMyRestaurant,
  createMyRestaurant,

};