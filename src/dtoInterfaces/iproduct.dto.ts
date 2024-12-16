export interface ICteateProductInputDto {
  name: string;
  category: string;
  price: number;
}

export interface IUpdateProductDto {
  name?: string;
  category?: string;
  price?: number;
}
