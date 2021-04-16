import {Module} from "@nestjs/common";
import {UsersController} from "./users.controller";
import {MongooseModule} from "@nestjs/mongoose";
import {User, userSchema} from "./schemas/user.schema";
import {UsersService} from "./users.service";



@Module({
    providers:[UsersService],
    controllers:[UsersController],
    imports:[MongooseModule.forFeature([
        {name: User.name , schema: userSchema}
    ])]

})
export class UsersModule{

}