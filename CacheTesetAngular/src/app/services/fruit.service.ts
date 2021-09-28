import { Fruit } from './../models/fruit';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { shareReplay } from 'rxjs/operators';
import { Media } from '../models/media.model';

@Injectable({
  providedIn: 'root'
})
export class FruitService {

  private readonly cache: Map<string, Observable<string[]>> =
    new Map<string, Observable<string[]>>();

  constructor(private http: HttpClient) { 

  }

  //caching at webapi
  getFruits(){
   return this.http.get('http://localhost:5000/api/Fruit');
  }

  //caching at angular
  getFruitByName(name: string): Observable<Fruit> {
    const key = name;
    if (!this.cache[key]) {
      this.cache[key] = this.http
        .get<Fruit>(`http://localhost:5000/api/Fruit/GetFruitByName/${name}`)
        .pipe(shareReplay(1));
    }
    return this.cache[key];
  }

  getMedia(){
    return this.http.get<Media[]>('http://localhost:5000/api/Fruit/media');
 }
}
