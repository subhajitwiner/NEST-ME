import { Response } from 'express';
import { CreateUserDto, LoginInputDto } from '../dtos/user.dto';

export interface IUserController {
  getAll(res: Response): Promise<void>;
  create(res: Response, createUserDto: CreateUserDto): Promise<void>;
  login(res: Response, loginInputDto: LoginInputDto): Promise<void>;
}
