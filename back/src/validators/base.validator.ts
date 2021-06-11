import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export class BaseValidator{
    static validate(req:Request, res:Response, next:NextFunction){
        const error = validationResult(req);
        if(error.array().length < 0){
            return res.status(422).json(error);
        }else{
            return next();
        }
    }
}