import { Router } from "express";
import { UserController } from "../controller/user.controller";
import { UserValidator } from "../validators/users.validator";

const UserRouter = Router();

UserRouter.get('/api/user', UserController.getAll);
UserRouter.post('/api/user', UserValidator.getRules(), UserValidator.validate, UserController.newUser);

export{UserRouter};