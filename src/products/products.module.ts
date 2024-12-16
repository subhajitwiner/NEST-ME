import { Module } from '@nestjs/common';
import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from '../repository/models/product.model';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { RepositoryModule } from 'src/repository/repository.module';
@Module({
  controllers: [ProductController],
  imports: [SequelizeModule.forFeature([Product]), RepositoryModule],
  providers: [ProductService, AuthGuard],
  exports: [ProductService]
})
export class ProductsModule {}
