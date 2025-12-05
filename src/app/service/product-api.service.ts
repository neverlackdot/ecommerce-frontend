import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { Products } from '../model/model';

@Injectable({
  providedIn: 'root',
})
export class ProductApiService {
  baseUrl = 'http://localhost:3000/api/products';
  constructor(private http: HttpClient) {}

  getProduct(): Observable<Products[]> {
    return this.http.get<Products[]>(this.baseUrl).pipe(shareReplay(1));
  }
    saveProduct(obj:Products): Observable<Products> {
    return this.http.post<Products>(this.baseUrl,obj).pipe(shareReplay(1));
  }
  deleteProduct(product_id:string){
    return this.http.delete<Products[]>(`${this.baseUrl}/${product_id}`)
  }
EditProduct(product_id: string, obj: Products): Observable<Products> {
  return this.http.patch<Products>(`${this.baseUrl}/${product_id}`, obj);
}
}
