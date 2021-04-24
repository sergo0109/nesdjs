import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './usersDto/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './usersDto/update-user.dto';
import { User } from './schemas/user.schema';

@Controller('users')
@UsePipes(new ValidationPipe())
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  create(@Body() createUser: CreateUserDto): Promise<string> {
    return this.userService.create(createUser);
  }

  @Get()
  async getAll(): Promise<User[]> {
    return await this.userService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id): Promise<User> {
    return this.userService.getById(id);
  }

  @Put(':id')
  updateUser(
    @Param('id') id: string,
    @Body() updateUser: UpdateUserDto,
  ): Promise<string> {
    return this.userService.updateUser(id, updateUser);
  }

  @Delete(':id')
  deleteUser(@Param('id') id): Promise<string> {
    return this.userService.deleteUser(id);
  }
}
