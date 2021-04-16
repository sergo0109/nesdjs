import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    Res,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import {CreateUserDto} from "./usersDto/create-user.dto";
import {UsersService} from "./users.service";
import {UpdateUserDto} from "./usersDto/update-user.dto";

@Controller('users')
@UsePipes(new ValidationPipe())
export class UsersController {

    constructor(private  readonly userService:UsersService) {}

    @Post()
    create(@Res() res,@Body() createUser:CreateUserDto){
       return this.userService.create(res,createUser)
    }

    @Get()
  async  getAll(@Res() res):Promise<void>{
        return await this.userService.getAll(res);
    }


    @Get(':id')
    getById(@Param('id') id,@Res() res):Promise<void>{
        return this.userService.getById(res,id)
    }

    @Put(':id')
    // @HttpCode(HttpStatus.ACCEPTED)
    updateUser(@Res()res,@Param('id') id:string, @Body() updateUser:UpdateUserDto):Promise<void>{
        return this.userService.updateUser(res,id,updateUser)
    }

    @Delete(':id')
    // @HttpCode(HttpStatus.ACCEPTED)
    deleteUser(@Res() res, @Param('id') id):Promise<void>{
        return this.userService.deleteUser(res,id)
    }

}
