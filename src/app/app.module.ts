import en from '@angular/common/locales/en';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { en_US } from 'ng-zorro-antd/i18n';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
//import { PageNotFoundModule } from './pages/page-not-found/page-not-found.module';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
//import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageNotFoundModule } from './pages/page-not-found/page-not-found.module';
registerLocaleData(en);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    PageNotFoundModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }, CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
