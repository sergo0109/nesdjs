import {IsEmail, IsPhoneNumber, Length} from "class-validator";

export class UpdateUserDto {

    @Length(3,30,{message:"name must be 3-30"})
     readonly name:string

    @Length(3,15, {message:"userName must be 5-15"})
    readonly userName:string

    @IsEmail()
    readonly email:string

    @IsPhoneNumber("AM",{message:"phone must be phone number"})
    readonly phone:number

    @Length(8,20,{message:"password must be 8-20"})
    readonly password:string
}