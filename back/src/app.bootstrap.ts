import { json } from "body-parser";
import express from "express";
import { UserRouter } from "./router/user.router";

const app = express();
app.use(json());
app.use(UserRouter);
export {app};