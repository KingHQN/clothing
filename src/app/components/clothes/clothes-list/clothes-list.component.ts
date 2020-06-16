import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClothesService } from 'src/app/services/clothes.service';
import { Observable } from 'rxjs';
import { Clothes } from 'src/app/models/clothes.model';

@Component({
  selector: 'app-clothes-list',
  templateUrl: './clothes-list.component.html',
  styleUrls: ['./clothes-list.component.scss']
})
export class ClothesListComponent implements OnInit {

  clothes: Observable<Clothes[]>;
  page = 1;
  pageSize = 6;

  // tslint:disable-next-line: variable-name
  constructor(private _clothesService: ClothesService) {
  }

  ngOnInit(): void {
    this.clothes = this._clothesService.clothes$;
  }

}
