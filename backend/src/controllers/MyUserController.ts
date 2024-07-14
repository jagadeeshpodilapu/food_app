import exp from "constants";
import { Request, Response } from "express";
import User from "../models/user";

const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const currentUser = await User.findOne({ _id: req.userId });

    if (!currentUser) {
      return res.status(400).json({
        message: "User not found"
      });
    }

    res.status(200).json(currentUser);

  } catch (error) {
    console.log(error);
    res.status(200).json({
      message: "Something went wrong",
    });
  }


};

const createCurrentUser = async (req: Request, res: Response) => {
  //1. check if user exist or not
  //2. create the user if doesnt exist
  //3. return the user object to client

  try {
    const { auth0Id } = req.body;
    const existingUser = await User.findOne({ auth0Id });
    if (existingUser) {
      return res.status(200).send();
    }
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser.toObject());
  } catch (error) {
    console.log(error);
    res.status(200).json({
      message: "Error Creating User",
    });
  }
};

const updateCurrentUser = async (req: Request, res: Response) => {
  try {
    const { name, addressLine1, country, city } = req.body;

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    user.name = name;
    user.addressLine1 = addressLine1;
    user.country = country;
    user.city = city;

    await user.save();
    res.send(user);
  } catch (error) {
    res.status(500).json({ message: "Error Updating the User" });
  }
};



export default {
  getCurrentUser,
  createCurrentUser,
  updateCurrentUser,
};
