import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import  * as mongoose from "mongoose";

export type UserDocument = User & Document
@Schema()
export class User{

    @Prop({required:true})
    name:string

    @Prop({unique:true, required:true})
    userName:string

    @Prop({required:true,type: mongoose.Schema.Types.Date})
    DOB:string

    @Prop({unique:true,required:true})
    email:string

    @Prop({unique:true,required:true})
    phone:number

    @Prop({required:true})
    password:string

}



export const userSchema = SchemaFactory.createForClass(User)

