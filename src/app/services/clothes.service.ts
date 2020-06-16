import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Category, Clothes } from '../models/clothes.model';
import { Observable, throwError as observableThrowError, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClothesService {

  // tslint:disable-next-line: variable-name
  private _urlCategory = 'http://localhost:3001/api/category';
  // tslint:disable-next-line: variable-name
  private _urlClothes = 'http://localhost:3001/api/clothes';

  private clothes: Clothes[];
  private filteredClothes: Clothes[];
  private lengthSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private displayClothesSubject: BehaviorSubject<Clothes[]> = new BehaviorSubject<Clothes[]>([]);

  clothes$: Observable<Clothes[]> = this.displayClothesSubject.asObservable();
  length$: Observable<number> = this.lengthSubject.asObservable();

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this._urlCategory).pipe(catchError(this.errorHandler));
  }

  getClothes(): Observable<Clothes[]> {
    return this.http.get<Clothes[]>(this._urlClothes).pipe(catchError(this.errorHandler));
  }

  setData(data) {
    this.displayClothesSubject.next(data);
  }

  errorHandler(error: HttpErrorResponse) {
    return observableThrowError(error.message || 'Server error');
  }
}
