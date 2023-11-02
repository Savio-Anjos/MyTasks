import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ThemeService } from 'src/app/shared/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent {
  @Output() navToCreateTask = new EventEmitter<void>();
  @Output() navToListTasks = new EventEmitter<void>();

  constructor(private themeService: ThemeService) {}

  public navToCreate(): void {
    this.navToCreateTask.emit();
  }

  public navToList(): void {
    this.navToListTasks.emit();
  }

  public toggleTheme(): void {
    this.themeService.setTheme();
  }
}
