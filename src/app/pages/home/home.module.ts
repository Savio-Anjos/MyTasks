import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { FormsModule } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzButtonModule,
    HomeRoutingModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    NzInputModule,
    NzIconModule,
  ],
})
export class HomeModule {}
