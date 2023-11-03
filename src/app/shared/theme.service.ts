import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private theme: string = 'dark';
  private themeSubject: BehaviorSubject<string> = new BehaviorSubject<string>(
    this.theme
  );

  constructor() {}

  public getTheme() {
    return this.themeSubject.asObservable();
  }

  public setTheme(): void {
    if (this.theme === 'light') {
      this.theme = 'dark';
    } else {
      this.theme = 'light';
    }

    this.themeSubject.next(this.theme);
  }
}
