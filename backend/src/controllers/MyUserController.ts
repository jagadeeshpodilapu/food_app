import exp from "constants";
import { Request, Response } from "express";
import User from "../models/user";


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
            message: "Error Creating User"
        });

    }

}
export default {
    createCurrentUser,

}