import { Product } from "../domain/product";
import { ProductRepository } from "../domain/productRepository";

export class AddProductUseCase{
    constructor(readonly productRepository: ProductRepository){}
    async run (name: string, description: string, price: string): Promise<Product | null >{
        try {
            const createProduct = await this.productRepository.addProduct(name, description, price);
            return createProduct;      
        } catch (error) {
            console.log('Error in AddProductCase', error)
            return null
        }
    }    
}