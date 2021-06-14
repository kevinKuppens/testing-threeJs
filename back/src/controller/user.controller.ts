import { getModelForClass } from "@typegoose/typegoose";
import { Request, Response } from "express";
import { User } from "../models/Users";

export class UserController{
    static model = getModelForClass(User);

    static async getAll(req:Request, res:Response){
        const users = await UserController.model.find({}).select('username');
        res.json(`users : ${users}`);
    }
    static async newUser(req:Request, res:Response){
        if(!req.body.profilePic){
            req.body.profilePic = 'default-user.png'
        }
        return res.json(await UserController.model.register(req.body, req.body.password));
    }

    static async updateUser(req:Request, res:Response){
        const { id } = req.params;
        return res.json(await UserController.model.updateOne({_id:id}, req.body));
    }
    static async deleteUser(req:Request, res:Response){
        const { id } = req.params;
        return res.json(await UserController.model.deleteOne({_id:id}));
    }
}