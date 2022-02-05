import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, HttpException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { toResponse } from './users.utils';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    if (!createUserDto.name) {
      throw new HttpException('Name field was not found',  HttpStatus.BAD_REQUEST);
    }
    const createdUser =  await this.usersService.create(createUserDto);
    return toResponse(createdUser);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const users = await this.usersService.findAll();
    return users.map((user) => toResponse(user));
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new HttpException('User was not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    if (!updateUserDto.name) {
      throw new HttpException('Name field was not found', HttpStatus.BAD_REQUEST);
    }
    const updatedUser = await this.usersService.update(id, updateUserDto);
    if (!updatedUser) {
      throw new HttpException('User was not found', HttpStatus.NOT_FOUND);
    }
   return toResponse(updatedUser);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    if (!id) {
      throw new HttpException('User was not found', HttpStatus.BAD_REQUEST);
    }
    await this.usersService.remove(id);
  }
}

