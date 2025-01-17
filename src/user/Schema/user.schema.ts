import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema() 
export class User {
    @Prop({unique:true})
    username:string;
    @Prop()
    password:string;
    @Prop()
    email:string;
    @Prop()
    DOB:string;
    
}
export const userSchema =SchemaFactory.createForClass(User)

