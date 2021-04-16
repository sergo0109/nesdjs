import {IsDateString, IsEmail, IsPhoneNumber, IsString, Length} from "class-validator";


export class CreateUserDto{

    @Length(3,30, {message:"name must be 3-30"})
    readonly name:string

    @Length(3,15, {message:"userName must be 5-15"})
    readonly userName:string

    @IsDateString()
    readonly DOB:string

    @IsEmail()
    readonly email:string

    @IsPhoneNumber("AM",{message:"phone must be  phone number"})
    readonly phone:number

    @Length(8,20,{message:"password must be 5-15"})
    password:string

}