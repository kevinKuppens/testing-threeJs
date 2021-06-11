import { body } from "express-validator";
import { BaseValidator } from "./base.validator";

export class UserValidator extends BaseValidator{
     static getRules(){
         return [
            body('username').notEmpty().withMessage('You must enter a username'),
            body('email').isEmail().withMessage('This field must be a correct email')
                            .notEmpty().withMessage('This fields must not be empty'),
            body('password').isStrongPassword().withMessage('The password is not strong enough')
                            .notEmpty().withMessage('This fields must not be empty'),
         ]
     }
}