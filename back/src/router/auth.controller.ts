import { getModelForClass } from "@typegoose/typegoose";
import { NextFunction, Request, Response } from "express";
import { sign, verify } from "jsonwebtoken";
import { User } from "../models/Users";

export class AuthController{
    //AUTH CONTROLLER
    static model = getModelForClass(User);

    static async login(req:Request, res:Response, next:NextFunction){
        const {user} = await AuthController.model.authenticate()(req.body.username, req.body.password);
        if(user){
            const jwToken = await sign({ exp:Math.floor(Date.now()/1000) +( 60* (parseInt(process.env.JWT_EXP || '1') )),
            data:user.id}, process.env.JWT_SECRET || '')
            res.json(jwToken);
        }else{
            const error:Error = new Error();
            error.message = 'Bad credential';
            error.status = 401;
            next(error);
        }
    }

    static async authenticate(req:Request, res:Response, next:NextFunction){
        try{
            const jwtToken = req.headers.authorization?.split(' ')[1] || 'notoken';
            const userId = await verify(jwtToken, process.env.JWT_SECRET || '');
            next();
        }catch(err){
            const error = new Error();
            error.message = 'Bad token, get out of here !'
            error.status = 401;
            next(error);
        }
    }
}