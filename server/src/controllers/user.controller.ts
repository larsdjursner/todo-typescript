import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
  } from '@nestjs/common';
  import { UserService } from '../services/user.service';
  import { User as UserModel } from '@prisma/client';
  
  @Controller()
  export class UserController {
    constructor(
      private readonly userService: UserService,
    ) {}
  
    @Get('users/:id')
    async getUserById(@Param('id') id: string): Promise<UserModel> {
      return this.userService.user({ id: Number(id) });
    }
  
    @Get('users')
    async getUsers(): Promise<UserModel[]> {
      return this.userService.users({
      });
    }
  
    @Post('users')
    async createUser(
      @Body() userData: { name: string; email: string },
    ): Promise<UserModel> {
        return this.userService.createUser(userData);
    }

    @Put('users/:id')
    async updateUser(@Param('id') id: string, @Body() userData): Promise<UserModel> {
        return this.userService.updateUser({
        where: { id: Number(id) },
        data:  userData 
      });
    }
  
    @Delete('users/:id')
    async deleteUser(@Param('id') id: string): Promise<UserModel> {
      return this.userService.deleteUser({ id: Number(id) });
    }
  
  }