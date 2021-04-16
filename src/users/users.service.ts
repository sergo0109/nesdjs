
import {Message, Validation} from "./validation/validation";
import {CreateUserDto} from "./usersDto/create-user.dto";
import {Body, HttpStatus, Injectable, NotFoundException, Res} from "@nestjs/common";
import {User} from "./schemas/user.schema";
import * as bcrypt from 'bcrypt';
import * as mongoose from "mongoose";
import {UpdateUserDto} from "./usersDto/update-user.dto";




@Injectable()
export class UsersService extends Validation{


    async create(res,userDto:CreateUserDto):Promise<void>{
        const validResult:Message = await this.checkUniqueForCreate(userDto.userName,userDto.email,userDto.phone)
        if(validResult.result==false){
            res.status(HttpStatus.BAD_REQUEST).send(validResult.message)
        }else {
            const hushedPassword:string= await bcrypt.hash(userDto.password,10)
            userDto.password=hushedPassword
            const newUser= new this.userModel(userDto)
            await newUser.save()
            res.status(HttpStatus.CREATED).send(validResult.message)
        }
    }



    async getAll(res):Promise<void>{
        const users:User[]= await this.userModel.find().exec()
        if(users[0]) {
           res.status(HttpStatus.OK).send(users)
        }
        res.status(HttpStatus.BAD_REQUEST).send("bad request")
    }



    async getById(res,id:string):Promise<void>{
        const check:boolean=mongoose.Types.ObjectId.isValid(id)
        if(check===true) {
            const user:User = await this.userModel.findById(id)
            if(user){
                res.status(HttpStatus.OK).send(user)
            }else{
                res.status(HttpStatus.BAD_REQUEST).send("Check entered ID")
            }
        }
        res.status(HttpStatus.BAD_REQUEST).send("entered ID unValid")
    }


    async updateUser (res,id:string,updateUserDto:UpdateUserDto):Promise<void>{
        const check:boolean= mongoose.Types.ObjectId.isValid(id)
        if(check===true) {
            const user:User = await this.userModel.findById(id)
            if(user){
                const validResult:Message = await this.checkUniqueForUpdate(user,updateUserDto.userName,updateUserDto.email,updateUserDto.phone)
                if(validResult.result===true){
                    mongoose.set('useFindAndModify', false)
                    await this.userModel.findByIdAndUpdate(id,updateUserDto)
                    res.status(HttpStatus.ACCEPTED).send(validResult.message)
                }
                res.status(HttpStatus.BAD_REQUEST).send(validResult.message)
            }else{
                res.status(HttpStatus.BAD_REQUEST).send("Check entered ID")

            }
        }
        res.status(HttpStatus.BAD_REQUEST).send("entered ID unValid")

    }


    async deleteUser(res,id:string):Promise<void>{
        const check:boolean=mongoose.Types.ObjectId.isValid(id)
        if(check===true) {
            const user:User = await this.userModel.findById(id)
            if(user) {
                await this.userModel.findByIdAndDelete(id)
                res.status(HttpStatus.ACCEPTED).send("user deleted")
            }
            res.status(HttpStatus.BAD_REQUEST).send("Check entered ID")
        }
        res.status(HttpStatus.BAD_REQUEST).send("entered ID unValid")
    }
}