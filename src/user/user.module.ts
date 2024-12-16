import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../repository/models/user.model';
import { UserService } from './user/user.service';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { RepositoryModule } from 'src/repository/repository.module';

@Module({
  controllers: [UserController],
  imports: [SequelizeModule.forFeature([User]), RepositoryModule],
  providers: [UserService, AuthGuard],
  exports: [UserService]
})
export class UserModule {}
