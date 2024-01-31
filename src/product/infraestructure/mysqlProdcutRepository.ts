import { Product } from "../domain/product";
import { ProductRepository } from "../domain/productRepository";
import ProductModel from "./model/productModel";

export class MysqlProdcutRepository implements ProductRepository{
    async addProduct(name: string, description: string, price: string): Promise<Product | null> {
        try{
            const createdProduct = await ProductModel.create({name, description, price});
            return new Product(createdProduct.id , createdProduct.name, createdProduct.description, createdProduct.price)
        }catch(error){
            console.error("Error In Mysql", error)
            return null;
        }
    }
}