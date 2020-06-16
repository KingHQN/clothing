import { Component, OnInit, Input } from '@angular/core';
import { Clothes } from 'src/app/models/clothes.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-clothes-item',
  templateUrl: './clothes-item.component.html',
  styleUrls: ['./clothes-item.component.scss']
})
export class ClothesItemComponent implements OnInit {
  @Input() clothe: Clothes;

  data: Clothes;
  size;
  color;
  sizeIsSelect = false;
  colorIsSelect = false;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.data = { ...this.clothe };
  }

  addToCart() {
    this.sizeIsSelect = false;
    this.colorIsSelect = false;
    this.cartService.addCart(this.data);
  }

  checkSize(value) {
    this.sizeIsSelect = !this.sizeIsSelect;
    this.size = value;
    this.data = { ...this.data, size: this.size };
  }

  checkColor(value) {
    this.colorIsSelect = true;
    this.color = value;
    this.data = { ...this.data, color: this.color };
  }

}
