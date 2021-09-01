import { Observable } from 'rxjs';

export interface FruitCache<T> {
    expires: number;
    observable: Observable<T>;
}