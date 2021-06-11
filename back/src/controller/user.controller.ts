import { getModelForClass } from "@typegoose/typegoose";
import { Request, Response } from "express";
import { User } from "../models/Users";

export class UserController{
    static model = getModelForClass(User);

    static async getAll(req:Request, res:Response){
        res.send('OK');
    }
    static async newUser(req:Request, res:Response){
        return res.json(await UserController.model.create(req.body));
    }
}