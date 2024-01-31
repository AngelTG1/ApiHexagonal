import { Product } from "./product";

export interface ProductRepository{
    addProduct(name: string, description: string, price: string ): Promise<Product | null>
};