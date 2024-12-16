import { HttpStatus, Injectable } from '@nestjs/common';

import {
  CteateProductInputDto,
  ProductListOutputDto,
  ProductOutputDto,
  UpdateProductDto,
} from '../../dtos/product.dto';
import { ProductRepoService } from 'src/repository/repos/product-repo/product-repo.service';

@Injectable()
export class ProductService {
  constructor(
  private readonly productRepo: ProductRepoService
  ) {}
  async create(input: CteateProductInputDto) {
    try {
      let result = await this.productRepo.create(input);
      let productOutputDto: ProductOutputDto = {
        result: result,
        error: false,
        message:''
      } as ProductOutputDto
      return {status: HttpStatus.CREATED, productOutputDto};
    } catch (error) {
      let productOutputDto: ProductOutputDto = {
        result: null,
        error: false,
        message:''
      } as ProductOutputDto
      return {status: HttpStatus.INTERNAL_SERVER_ERROR, productOutputDto};
    }
  }
  async findAll(){
    try {
      let productList = await this.productRepo.findAll();
      
      let productListOutputDto : ProductListOutputDto = {
        result: productList,
        error: false,
        message: '',
        token: ''
      } as ProductListOutputDto
      return {status: HttpStatus.OK, productListOutputDto}
    } catch (error) {
      let productListOutputDto : ProductListOutputDto = {
        result: null,
        error: false,
        message: 'failed',
        token: ''
      }
      return {status: HttpStatus.INTERNAL_SERVER_ERROR, productListOutputDto}
    }
  }
  async getByid(id: string){
    try {
      let product = await this.productRepo.findOne(id);
      let productOutputDto: ProductOutputDto = {
        result: product,
        error: false, 
        message:''
      } as ProductOutputDto
      return {status: HttpStatus.OK, productOutputDto};
    } catch (error) {
      let productOutputDto: ProductOutputDto = {
        result: null,
        error: false, 
        message:''
      }
      return {status: HttpStatus.INTERNAL_SERVER_ERROR, productOutputDto};
    }
  }

  async findOne(id: string) {
    try {
      let product= await this.productRepo.findOne(id);
      let productOutputDto: ProductOutputDto = {
        result: product,
        error: false,
        message:''
      } as ProductOutputDto
      return {status: HttpStatus.CREATED, productOutputDto};
    } catch (error) {
      let productOutputDto: ProductOutputDto = {
        result: null,
        error: true,
        message:error.message
      } as ProductOutputDto
      return {status: HttpStatus.INTERNAL_SERVER_ERROR, productOutputDto};
    }
  }
  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      let result = await this.productRepo.update(id, updateProductDto);
      let productOutputDto: ProductOutputDto = {
        result,
        error: false,
        message:''
      } as ProductOutputDto 
      return {status: HttpStatus.OK, productOutputDto}
    } catch (error) {
      let productOutputDto: ProductOutputDto = {
        result: null,
        error: true,
        message:error.message
      } as ProductOutputDto
      return {status: HttpStatus.INTERNAL_SERVER_ERROR, productOutputDto};
    }
  }
  async remove(id: string) {
    try {
      await this.productRepo.remove(id);
      let productOutputDto: ProductOutputDto = {
        result: null,
        error: false,
        message:""
      } as ProductOutputDto
      return {status: HttpStatus.OK, productOutputDto};
    } catch (error) {
      let productOutputDto: ProductOutputDto = {
        result: null,
        error: true,
        message:error.message
      } as ProductOutputDto
      return {status: HttpStatus.INTERNAL_SERVER_ERROR, productOutputDto};
    }
  }
}
