import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent {
  constructor() {}
  @Output() navToCreateTask = new EventEmitter<void>();
  @Output() navToListTasks = new EventEmitter<void>();

  public navToCreate(): void {
    this.navToCreateTask.emit();
  }

  public navToList(): void {
    this.navToListTasks.emit();
  }
}
