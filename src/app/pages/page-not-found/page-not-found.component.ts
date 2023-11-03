import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/shared/theme.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.sass'],
})
export class PageNotFoundComponent implements OnInit {
  public theme: string = '';

  constructor(private themeService: ThemeService) {}

  public ngOnInit(): void {
    this.getTheme();
  }

  public getTheme(): void {
    this.themeService.getTheme().subscribe((theme) => {
      this.theme = theme;
    });
  }
}
