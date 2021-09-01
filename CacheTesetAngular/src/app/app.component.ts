import { Fruit } from './models/fruit';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { FruitService } from './services/fruit.service';
import { FruitCache } from './models/cache';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private service: FruitService){

  }
  
  fruitById: Fruit;
  fruitCache: { [id: string]: FruitCache<Fruit[]> };


  data: any;
  apple: any;
  ngOnInit(): void {

  }
  getData() {
    this.service.getFruits().subscribe(x => this.data = x);
  }

  getApple() {
    this.service.getFruitByName('Apple').subscribe(x => this.apple = x);
  }

  getOrange() {
    this.service.getFruitByName('Orange').subscribe(x => this.apple = x);
  }

setCacheItem(key: string, value: Observable<Fruit[]>): void {
    const EXPIRES = Date.now() + (1000 * 60 * 60) / 2;
    this.fruitCache[key] = { expires: EXPIRES, observable: value } as FruitCache<Fruit[]>;
}

deleteCacheItem(key: string) {
    delete this.fruitCache[key];
}

}
