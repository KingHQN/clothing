import { Component, OnInit } from '@angular/core';
import { ClothesService } from 'src/app/services/clothes.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Clothes } from 'src/app/models/clothes.model';

@Component({
  selector: 'app-clothes',
  templateUrl: './clothes.component.html',
  styleUrls: ['./clothes.component.scss']
})
export class ClothesComponent implements OnInit {

  public categories = [];
  public clothes = [];
  clothes$: Observable<Clothes[]>;

  // tslint:disable-next-line: variable-name
  constructor(private _clothesService: ClothesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this._clothesService.getCategories().subscribe(data => this.categories = data);
    this._clothesService.getClothes().subscribe(data => {
      this.clothes = data;
      this._clothesService.setData(this.clothes);
    });
    this.clothes$ = this._clothesService.clothes$;
  }

  nonAccentVietnamese(str) {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    // Some system encode vietnamese combining accent as individual utf-8 characters
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // Huyền sắc hỏi ngã nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // Â, Ê, Ă, Ơ, Ư
    return str;
  }

  changeFilter(value) {
    if (value === 'all') {
      this._clothesService.setData(this.clothes);
    } else {
      const idCate = this.categories.find(x => x.name === value)._id;
      this._clothesService.setData(this.clothes.filter(d => d.categoryId === idCate));
    }
  }

}
