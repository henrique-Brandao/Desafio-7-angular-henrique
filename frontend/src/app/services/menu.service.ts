import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private menuExpandedSource = new BehaviorSubject<boolean>(false);
  menuExpanded$ = this.menuExpandedSource.asObservable();

  constructor() { }

  toggleMenu() {
    this.menuExpandedSource.next(!this.menuExpandedSource.value);
  }

  setMenuExpanded(expanded: boolean) {
    this.menuExpandedSource.next(expanded);
  }
}