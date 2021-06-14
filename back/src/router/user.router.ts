import { Router } from "express";
import { UserController } from "../controller/user.controller";
import { UserValidator } from "../validators/users.validator";
import { AuthController } from "./auth.controller";

const UserRouter = Router();

UserRouter.get('/api/user', AuthController.authenticate, UserController.getAll);
UserRouter.post('/api/user', UserValidator.getRules(), UserValidator.validate, UserController.newUser);
UserRouter.put('/api/user/:id',AuthController.authenticate , UserValidator.getRules(), UserValidator.validate, UserController.updateUser);
UserRouter.delete('/api/user/:id',AuthController.authenticate , UserValidator.getRules(), UserValidator.validate, UserController.deleteUser);
UserRouter.post('/api/login', AuthController.login)

export{UserRouter};