import { ApiProperty } from '@nestjs/swagger';
import {
  ICteateProductInputDto,
  IUpdateProductDto,
} from 'src/dtoInterfaces/iproduct.dto';
import { CommonDto } from './common.dto';
import { IsString, IsDecimal, IsOptional } from 'class-validator';

export class CteateProductInputDto implements ICteateProductInputDto {
  @ApiProperty({ example: 'Margo', description: 'A sope' })
  @IsString()
  name: string;
  @ApiProperty({ example: 'Shope', description: 'A sope' })
  @IsString()
  category: string;
  @ApiProperty({ example: 45, description: 'Ammount of single unit' })
  @IsDecimal()
  price: number;
}

export class UpdateProductDto implements IUpdateProductDto {
  @ApiProperty({ example: 'Margo', description: 'A sope', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: 'Shope', description: 'A sope', required: false })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiProperty({ example: 45, description: 'Ammount of single unit' })
  @IsDecimal()
  @IsOptional()
  price?: number;
}
export interface ProductOutputDto extends CommonDto {
  result: ProductDto;
}
export interface ProductListOutputDto extends CommonDto {
  result: ProductDto[];
}
export interface ProductDto {
  id?: number;
  price: number;
  name?: string;
  category?: string;
  updatedAt: string;
  createdAt: string;
}