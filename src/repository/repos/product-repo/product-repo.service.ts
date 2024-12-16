import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CteateProductInputDto, UpdateProductDto } from 'src/dtos/product.dto';
import { Product } from 'src/repository/models/product.model';

@Injectable()
export class ProductRepoService {
    constructor(@InjectModel(Product) private readonly ProductModel: typeof Product,){}
    create(input: CteateProductInputDto): Promise<Product> {
        return this.ProductModel.create({
          name: input.name,
          category: input.category,
          price: input.price,
        });
      }
    async findAll(): Promise<Product[]> {
    return this.ProductModel.findAll();
    }
    
    async findOne(id: string): Promise<Product> {
    return await this.ProductModel.findOne({
        where: {
        id,
        },
    });
    }
    async update( id: string, updateProductDto: UpdateProductDto, ): Promise<Product> {
        const product = await this.findOne(id);
        if (product) {
            await product.update(updateProductDto);
            return product;
        } else {
            return null;
        }
    }
    async remove(id: string) {
        try {
            const product = await this.findOne(id);
            await product.destroy();
            return null;
        } catch (error) {
            return 'delete faild';
        }
    }
}
