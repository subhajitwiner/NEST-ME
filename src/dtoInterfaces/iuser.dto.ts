export interface ICreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  password: string;
}
export interface ILoginInputDto{
    email: string;
    password: string;
  }
