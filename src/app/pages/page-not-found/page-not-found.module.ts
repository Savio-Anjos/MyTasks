import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [CommonModule, NzLayoutModule, ComponentsModule],

  exports: [PageNotFoundComponent],
})
export class PageNotFoundModule {}
