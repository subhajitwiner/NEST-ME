import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from 'src/dtos/user.dto';
import { User } from 'src/repository/models/user.model';

@Injectable()
export class UserRepoService {
    constructor(@InjectModel(User) private readonly userModel: typeof User,){}
    async findAll(): Promise<User[]> {
        return this.userModel.findAll();
      }
      async create(input: CreateUserDto, hashedPasscode: any) {
        let newInput = {
          firstName: input.firstName,
          lastName: input.lastName,
          isActive: input.isActive,
          email: input.email,
          password: hashedPasscode.password,
          passwordSalt: hashedPasscode.salt,
        };
        return this.userModel.create(newInput);
      }
      findOne(id: string): Promise<User> {
        return this.userModel.findOne({
          where: {
            id,
          },
        });
      }
      async findByEmail(email:string){
        return this.userModel.findOne({
          where:{
            email
          }
        })
      }
      async remove(id: string): Promise<void> {
        const user = await this.findOne(id);
        await user.destroy();
      }
}
