import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ICreateUserDto, ILoginInputDto } from 'src/dtoInterfaces/iuser.dto';
import { CommonDto } from './common.dto';
export class CreateUserDto implements ICreateUserDto {
  @ApiProperty({ example: 'John', description: 'The first name of the user' })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'The last name of the user' })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({
    example: 'example@gmail.com',
    description: 'The email of the user',
  })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ example: true, description: 'Is user active' })
  @IsOptional()
  @IsBoolean()
  isActive: boolean = true;

  @ApiProperty({ example: 'password', description: 'The password of the user' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
export interface UserOutputDto extends CommonDto {
  result: UserDto;
}
export interface UserDto {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  updatedAt: string;
  createdAt: string;
}
export class LoginInputDto implements ILoginInputDto{
  @ApiProperty({
    example: 'example@gmail.com',
    description: 'The email of the user',
  })
  @IsNotEmpty()
  @IsString()
  email: string;
  @ApiProperty({ example: 'password', description: 'The password of the user' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
