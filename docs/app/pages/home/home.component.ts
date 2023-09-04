import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Product } from "docs/app/models/product.model";
import { CartService } from "docs/app/services/cart.service";
import { StoreService } from "docs/app/services/store.service";

const ROW_HEIGHT: { [id: number]: number } = { 1: 400, 3: 355, 4: 350 };

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styles: [],
})
export class HomeComponent implements OnInit, OnDestroy {
  cols = 3;
  rowHeight = ROW_HEIGHT[this.cols];
  category: string | undefined;
  products: Array<Product> | undefined;
  sort = "desc";
  count = "12";
  productsSubscription: Subscription | undefined;

  constructor(
    private cartService: CartService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productsSubscription = this.storeService
      .getAllProducts(this.count, this.sort, this.category)
      .subscribe((_products) => {
        this.products = _products;
      });
  }

  onSortChange(newSort: string) {
    this.sort = newSort;
    this.getProducts();
  }

  onItemCountChange(newCount: number) {
    this.count = newCount.toString();
    this.getProducts();
  }

  onColumnsCountChange(colsNum: number): void {
    this.cols = colsNum;
    this.rowHeight = ROW_HEIGHT[this.cols];
  }

  onShowCategory(newCategory: string): void {
    this.category = newCategory;
    this.getProducts();
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
    });
  }

  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }
}
