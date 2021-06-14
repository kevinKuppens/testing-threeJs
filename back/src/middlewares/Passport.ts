import { getModelForClass } from "@typegoose/typegoose";
import { NextFunction, Request, Response } from "express";
import { Schema } from "mongoose";
import passport from "passport";
import { User } from "../models/Users";

export class PassportConfig{
    static model = getModelForClass(User)
    static configure = (req:Request, res:Response, next: NextFunction) =>{
        passport.initialize();
        passport.use(PassportConfig.model.createStrategy());
        next();
    }
}