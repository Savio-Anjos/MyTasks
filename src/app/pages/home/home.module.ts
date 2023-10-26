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
import { ComponentsModule } from 'src/app/components/components.module';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { NzTableModule } from 'ng-zorro-antd/table';

import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    NzFormModule,
    NzButtonModule,
    HomeRoutingModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    NzInputModule,
    NzIconModule,
    NzTableModule,
    NzPaginationModule,
    ComponentsModule,
  ],
  providers: [DatePipe],
})
export class HomeModule {}
