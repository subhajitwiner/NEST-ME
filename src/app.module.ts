import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './repository/models/user.model';
import { Sequelize } from 'sequelize-typescript';
import { RepositoryModule } from './repository/repository.module';
import { Order } from './repository/models/order.model';
import { Product } from './repository/models/product.model';
import { ProductsModule } from './products/products.module';
import { WebsocGateway } from './websoc/websoc.gateway';
import { NotificationService } from './notification/notification.service';
@Module({
  imports: [
    UserModule,
    ProductsModule,
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nestSequlize',
      models: [User, Product, Order],
      autoLoadModels: true,
      synchronize: false,
    }),
    RepositoryModule,
  ],
  controllers: [AppController],
  providers: [AppService, WebsocGateway, NotificationService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly sequelize: Sequelize) {}

  async onModuleInit() {
    // Sync models with { alter: true }
    await this.sequelize.sync({ alter: true});
    console.log('Database synchronized with alter: true');
  }
}
