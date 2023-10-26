import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [CommonModule, NzLayoutModule],
  exports: [HeaderComponent, FooterComponent],
})
export class ComponentsModule {}
