import { Module } from '@nestjs/common';
import { UserRepoService } from './repos/user-repo/user-repo.service';
import { ProductRepoService } from './repos/product-repo/product-repo.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { Order } from './models/order.model';
import { Product } from './models/product.model';


@Module({
    imports: [SequelizeModule.forFeature([User, Order, Product ])],
    providers: [UserRepoService, ProductRepoService],
    exports: [UserRepoService, ProductRepoService]
})
export class RepositoryModule {}
