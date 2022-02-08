import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, HttpException, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { toResponse } from './users.utils';
import { LoginUserDto } from './dto/login-user.dto';
import { SkipJwt } from '../common/decorators/skipJWT';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @SkipJwt()
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() { login, password }: LoginUserDto) {
    const token = await this.usersService.login(login, password);
    if (!token) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    return token;
  }

  @Post('/users')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    if (!createUserDto.name) {
      throw new HttpException('Name field was not found',  HttpStatus.BAD_REQUEST);
    }
    const createdUser =  await this.usersService.create(createUserDto);
    return toResponse(createdUser);
  }

  @Get('/users')
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const users = await this.usersService.findAll();
    return users.map((user) => toResponse(user));
  }

  @Get('/users/:id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new HttpException('User was not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @Put('/users/:id')
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

  @Delete('/users/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new HttpException('User was not found', HttpStatus.BAD_REQUEST);
    }
    await this.usersService.remove(id);
  }
}

