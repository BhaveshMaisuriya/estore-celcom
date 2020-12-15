import { Product } from "./product.model";

export class CompareProduct {
    public noOfProds: Product[] = new Array<Product>();
    public setCompareProd(product: CompareProduct) {
        if (product && product !== null) {
            this.noOfProds = product.noOfProds;
        }
    }
}