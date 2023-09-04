import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { loadStripe } from "@stripe/stripe-js";
import { Cart, CartItem } from "docs/app/models/cart.model";
import { CartService } from "docs/app/services/cart.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styles: [],
})
export class CartComponent implements OnInit {
  cart: Cart = { items: [] };

  dataSource: Array<CartItem> = [];
  displayedColumns: Array<string> = [
    "product",
    "name",
    "price",
    "quantity",
    "total",
    "action",
  ];

  constructor(private cartService: CartService, private http: HttpClient) {}

  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    });
  }

  onAddQuantity(item: CartItem): void {
    this.cartService.addToCart(item);
  }

  onRemoveQuantity(item: CartItem): void {
    this.cartService.removeQuantity(item);
  }

  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }

  onRemoveFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item);
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }

  onCheckout(): void {
    this.http
      .post("http://localhost:4201/checkout", { items: this.cart.items })
      .subscribe(async (res: any) => {
        let stripe = await loadStripe(
          "pk_test_51MrbjBSD0Ms19C7redX03Pv6uCvYXrLsuWK84lI7EWGgpT6WF9zlsYB2Xb2YmtW95JlV9zF5bkXk54DdISG4QjoR00NaduIbPE"
        );
        stripe?.redirectToCheckout({
          sessionId: res.id,
        });
      });
  }
}
