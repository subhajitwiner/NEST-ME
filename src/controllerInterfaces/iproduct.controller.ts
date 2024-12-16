import { Response } from 'express';
import { CteateProductInputDto, UpdateProductDto } from '../dtos/product.dto';
export interface IProductController {
  getAll(res: Response);
  getByid(id: string, res: Response);
  create(res: Response, input: CteateProductInputDto);
  update(id: string, updateProductDto: UpdateProductDto, res: Response);
  delete(id: string, res: Response);
}
