import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, LoginInputDto, UserOutputDto } from 'src/dtos/user.dto';
import { UserRepoService } from 'src/repository/repos/user-repo/user-repo.service';

import * as bcrypt from 'bcrypt';
import * as CryptoJS from 'crypto-js';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepoService) {}
  async register(createUserDto: CreateUserDto){
    try {
      let securePasswored = await CryptoJS.SHA512(createUserDto.password).toString();
      const salt = bcrypt.genSaltSync(Math.floor(Math.random() * 10));
      const hashedPassword = bcrypt.hashSync(
        securePasswored,
        salt,
      );
      let result = await this.userRepo.create(createUserDto, {
        password: hashedPassword,
        salt,
      });
      let resultOutput: UserOutputDto = {
        result: {
          id: result.id,
          firstName: result.firstName,
          lastName: result.lastName,
          email: result.email,
          isActive: result.isActive,
          createdAt: result.createdAt,
          updatedAt: result.updatedAt,
        },
        error: false,
        message: null,
      };
      return {status: HttpStatus.OK,resultOutput};
    } catch (error) {
      let resultOutput: UserOutputDto = {
        result: null,
        error: true,
        message: error.original.message,
      };
      return {status: HttpStatus.INTERNAL_SERVER_ERROR,resultOutput};
    }
  }
  async login(loginInputDto: LoginInputDto){
    try {
      let securePasswored = await CryptoJS.SHA512(loginInputDto.password).toString();
      let user = await this.userRepo.findByEmail(loginInputDto.email);
      if(user){
        let passwordMatch = bcrypt.compareSync(securePasswored, user.password);
        if(passwordMatch){
          const jwtToken = jwt.sign(
            {
              fname: user.firstName,
              lname: user.lastName,
              email: user.email,
            },
            'secret key',
            { expiresIn: '9d' }
          );
          let resultOutput: UserOutputDto = {
            result: {
              id: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              isActive: user.isActive,
              createdAt: user.createdAt,
              updatedAt: user.updatedAt,
            },
            error: false,
            token: jwtToken,
            message: null,
          };
          return {status: HttpStatus.OK,resultOutput};
          
        }
        else{
          let resultOutput: UserOutputDto = {
            result: null,
            error: true,
            message: "password not match",
          };
          return {status: HttpStatus.OK,resultOutput};
        }
      }
      else{
        let resultOutput: UserOutputDto = {
          result: null,
          error: true,
          message: "user not present register first",
        };
        return {status: HttpStatus.NOT_FOUND,resultOutput};
      }
    } catch (error) {
      let resultOutput: UserOutputDto = {
        result: null,
        error: true,
        message: error.original.message,
      };
      return {status: HttpStatus.INTERNAL_SERVER_ERROR,resultOutput};
    }
  }
  async getAll(){
    let userlist = await this.userRepo.findAll();
    return {status: HttpStatus.OK,userlist};
  }
}
