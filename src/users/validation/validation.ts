import {User, UserDocument} from "../schemas/user.schema";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";


export interface Message{
    message:string
    result:boolean
}

export class Validation{

    constructor(@InjectModel(User.name) protected userModel: Model<UserDocument>) {}

    async checkUniqueForCreate(f_userName:string,f_email:string,f_phone:number):Promise<Message>{
        let message:Message={
            message:"created",
            result:true
        }
        const user_userName:User= await this.userModel.findOne({userName:f_userName})
        const user_email:User= await this.userModel.findOne({email:f_email})
        const user_phone:User= await this.userModel.findOne({phone:f_phone})

        if(user_userName){
            message.message ="userName already existed"
            message.result=false
        }
        if(user_email){
            if(message.message==="created") {
                message.message = "email already existed"
                message.result=false
            }else{
                message.message="email "+message.message
            }
        }
        if(user_phone){
            if(message.message==="created") {
                message.message = "phone already existed"
                message.result=false
            }else{
                message.message="phone "+message.message
            }
        }


        return message
    }



    async checkUniqueForUpdate(user:User,f_userName:string,f_email:string,f_phone:number):Promise<Message>{
        let message:Message={
            message:"Updated",
            result:true
        }
        if(f_userName && (f_userName!==user.userName)) {
            const user_userName: User = await this.userModel.findOne({userName: f_userName})
            if(user_userName){
                message.result= false
                message.message= "userName already existed"
            }
        }
        if(f_email && f_email!=user.email) {
            const user_email: User = await this.userModel.findOne({email: f_email})
            if(user_email){
                if(message.message!=="Updated") {
                    message.message = "email" + message.message
                }else{
                    message.result=false
                    message.message = "email already existed"
                }
            }
        }
        if(f_phone && f_phone != user.phone) {
            const user_phone: User = await this.userModel.findOne({phone: f_phone})
            if (user_phone) {
                if (message.message!=="Updated") {
                    message.message = "phone " + message.message
                } else {
                    message.result = false
                    message.message = "phone already existed"
                }
            }
        }
        return message
    }


}