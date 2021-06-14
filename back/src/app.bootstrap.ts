import { json } from "body-parser";
import express from "express";
import { PassportConfig } from "./middlewares/Passport";
import { UserRouter } from "./router/user.router";

const app = express();
app.use(json());

app.use(PassportConfig.configure);
app.use(UserRouter);
export {app};