import { Controller, Body, Get, Post, Put, Res, Delete, Param, UseGuards} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { Response } from 'express';
import { CteateProductInputDto, UpdateProductDto} from '../../dtos/product.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get('getAll')
  @UseGuards(AuthGuard)
  async getAll(@Res() res: Response) {
   let result = await this.productService.findAll();
   res.status(result.status).json(result.productListOutputDto)
  }
  @Get('getById/:id')
  async getByid(@Param('id') id: string, @Res() res: Response) {
    let result = await this.productService.getByid(id);
    res.status(result.status).json(result);
  }
  @Post('create')
  async create(@Res() res: Response, @Body() input: CteateProductInputDto) {
      let result = await this.productService.create(input);
      res.status(result.status).json(result.productOutputDto);
  }
  @Put('update/:id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto, @Res() res: Response) {
    const result = await this.productService.update(
      id,
      updateProductDto,
    );
    res.status(result.status).json(result.productOutputDto);
  }
  @Delete('delete/:id')
  async delete(@Param('id') id: string, @Res() res: Response) {
      let result = await this.productService.remove(id);
      res.status(result.status).json(result.productOutputDto);
  }
}
