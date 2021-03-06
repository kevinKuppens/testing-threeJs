import { plugin, prop } from "@typegoose/typegoose";
import passportLocal from 'passport-local-mongoose';

@plugin(passportLocal, {
    usernameField : 'username'
})
export class User{
    @prop({required:true, unique:true})
    public username?:string;
    @prop({required:true, unique:true})
    public email?:string;
    // @prop({required:true})
    // public password?:string;
    @prop()
    public firstname?:string;
    @prop()
    public lastname?:string;
    @prop()
    public profilePic?:string;
}