import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { BaseService } from '../base.service';
import {AppService} from './app.service';
import { Product } from '../Model/product.model';
import { CompareProduct } from '../Model/product-compare.model';

const PRODUCT_COMPARE_KEY = "product_compare";

@Injectable()
export class CompareProductService extends BaseService {
    public filterSelectionApiURL = "";

constructor(private _service: AppService) {
  super();
}

public Find(apiURL: string): Observable<any[]> {
    const url = apiURL; // .replace(/[+_]/g,'%2B');
    return this._service
    .getEstoreData(url)
    .pipe(map((response: any) => {
        return response;
    }));
}

    public addProductToCompare(product: any): void {
        const compProduct = this.retrieveProduct();
        if (compProduct) {
        let prod = compProduct.noOfProds.find((p) => p.sku === product.sku);
        const prodCount = compProduct.noOfProds.length;
        const maxProdCount = this.ProdCount();

        if (prod === undefined && prodCount < maxProdCount) {
            prod = new Product();
            prod.sku = product.sku;
            prod.image = product.image;
            prod.id = product.id;
            prod.name = product.name;
            prod.price = product.price;

            compProduct.noOfProds.push(prod);
            this.save(compProduct);
            // alert(prod.sku +" added to Compare products");
            product.isAddedToCompare = true;

        } else if (prodCount >= maxProdCount) {
            alert("No. of products cannot exceed more than " + maxProdCount);
        } else {
            alert("Product is already added to Compare products");
        }
    }
    }
    public ProdCount() {
        let maxProdCount = 3;
        if (typeof navigator !== 'undefined') {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(navigator.userAgent);
        if (isMobile) {
            maxProdCount = 2;
        }
    }
        return maxProdCount;
    }

    public retrieveProduct(): CompareProduct {
        const product = new CompareProduct();
        if (typeof window !== 'undefined' && localStorage) {
            const storedProduct = localStorage.getItem(PRODUCT_COMPARE_KEY);
            if (storedProduct) {
                product.setCompareProd(JSON.parse(storedProduct));
            }
        }
        return product;
    }

    private save(product: CompareProduct): void {
        if (typeof window !== 'undefined' && localStorage) {
            localStorage.setItem(PRODUCT_COMPARE_KEY, JSON.stringify(product));
        }
    }

    public removeProductFromCompare(product: any) {
        const compProduct = this.retrieveProduct();
        if (compProduct) {
            const prod = compProduct.noOfProds.find((p) => p.sku === product.sku);
            if (prod !== undefined) {
                compProduct.noOfProds = compProduct.noOfProds.filter((item) => item !== prod);
            }
            this.save(compProduct);
        }
    }

    public removeAllProductFromCompare() {
        const compRmAllProduct = this.retrieveProduct();
        if (compRmAllProduct) {
            compRmAllProduct.noOfProds = [];
            this.save(compRmAllProduct);
        }
    }

    public createFilterApiURL(filteSelectedOptionsArray, sortType = "latest"): string {
        this.filterSelectionApiURL = "";
        let prevFilterGroup = "";

        filteSelectedOptionsArray.forEach((ele, ind) => {
            if (prevFilterGroup  !== "" && prevFilterGroup === ele.category) {
            this.filterSelectionApiURL += "," + ele.value;
            } else {
            prevFilterGroup =  ele.category;
            const prefix = ind ? "&" : "";
            this.filterSelectionApiURL += prefix + ele.category + "=" + ele.value;
            }
        });
        switch (sortType) {
            case "priceAsc":
            this.filterSelectionApiURL += !this.filterSelectionApiURL ? "sortby=price_asc" : "&sortby=price_asc";
            break;
            case "priceDesc":
            this.filterSelectionApiURL += !this.filterSelectionApiURL ? "sortby=price_desc" : "&sortby=price_desc";
            break;
            case 'positionDesc':
            this.filterSelectionApiURL += !this.filterSelectionApiURL ? "sortby=position_desc" : "&sortby=position_desc";
            break;
        }
        return this.filterSelectionApiURL;
    }

    public createSortByApiURL(sortType = "latest"): string {
         switch (sortType) {
            case "priceAsc":
            this.filterSelectionApiURL = "sortby=price_asc";
            break;
            case "priceDesc":
            this.filterSelectionApiURL = "sortby=price_desc";
            break;
            case 'positionDesc':
            this.filterSelectionApiURL = "sortby=position_desc";
            break;
            }
            return this.filterSelectionApiURL;
        }
}
