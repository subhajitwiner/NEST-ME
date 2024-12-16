import { Controller, Get, Post, Res, Body, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto, LoginInputDto } from '../../dtos/user.dto';
import { IUserController } from '../../controllerInterfaces/iuser.controller';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@ApiTags('User')
@Controller('user')
export class UserController implements IUserController {
  constructor(private readonly userService: UserService) {}
  @Get('getAll')
  async getAll(@Res() res: Response) {
    let result = await this.userService.getAll();
    res.status(result.status).json(result.userlist);
  }
  @Post('register')
  async create(@Res() res: Response, @Body() createUserDto: CreateUserDto) {
    let result = await this.userService.register(createUserDto);
    res.status(result.status).json(result.resultOutput);
  }
  @UseGuards(AuthGuard)
  @Post('login')
  async login(@Res() res: Response, @Body() loginInputDto: LoginInputDto){
    let result = await this.userService.login(loginInputDto);
    res.status(result.status).json(result.resultOutput);
  }
}
