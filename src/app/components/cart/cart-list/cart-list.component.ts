import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Cart } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';
import { takeUntil, map } from 'rxjs/operators';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})

export class CartListComponent implements OnInit, OnDestroy {
  cart$: Observable<Cart[]>;

  length = 0;
  total = 0;
  destroy$: Subject<null> = new Subject<null>();

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cart$ = this.cartService.cart$;
    this.cartService.length$.pipe(takeUntil(this.destroy$)).subscribe(length => this.length = length);
    this.cartService.total$.pipe(takeUntil(this.destroy$)).subscribe(total => this.total = total);
  }

  minusQuantity(item) {
    this.cartService.minusQuantity(item);
  }

  plusQuantity(item) {
    this.cartService.plusQuantity(item);
  }

  delItemCart(item) {
    this.cartService.delItemCart(item);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
