import { Product } from "../interfaces/product";

export class ProductModel implements Product{
    id:number;
    name: string;
    description: string;
    specs: string;
    stock: number;
    price: number;

    constructor(data: Partial<Product> = {}){
        this.id = data.id ?? 0;
        this.name = data.name ?? "";
        this.description = data.description ?? "";
        this.specs = 'n/a';
        this.stock = data.stock ?? 0;
        this.price = data.price ?? 0;
    }
}