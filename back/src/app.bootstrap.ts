import { json } from "body-parser";
import express from "express";
import { PassportConfig } from "./middlewares/Passport";
import { UserRouter } from "./router/user.router";
import cors from 'cors';
const app = express();

app.use(cors());
app.use(json());


app.use(PassportConfig.configure);
app.use(UserRouter);
export {app};