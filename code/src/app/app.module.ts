import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { RegistrationPageComponent } from "./components/registration-page/registration-page.component";
import { AppComponent } from './app.component';
import { ProductCardComponent } from "./components/product-card/product-card.component";
import { FilterComponent } from "./components/filter/filter.component";
import { HeaderComponent } from "./components/header/header.component";
import { CartComponent } from './components/cart-page/cart.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { PharmacistPageComponent } from './components/pharmacist-page/pharmacist-page.component';
import { CartItemCardComponent } from "./components/cart-page/cart-item-card/cart-item-card.component";
import { CartOrderCardComponent } from "./components/cart-page/cart-order-card/cart-order-card.component";
import { MainPageComponent} from "./components/main-page/main-page.component";
import { FormsModule } from "@angular/forms";
import { ItemComponent } from "./components/main-page/item/item.component";
import { AccountComponent } from "./components/user-page/account/account.component";
import {AccountOrderCardComponent} from "./components/user-page/account-order-card/account-order-card.component";
import { AppRoutingModule } from './routes/routes';
import { HeaderAuthorizedComponent } from './components/header/header-authorized/header-authorized.component';
import { HeaderPharmacistComponent } from './components/header/header-pharmacist/header-pharmacist.component';
import { HeaderUnauthorizedComponent } from './components/header/header-unauthorized/header-unauthorized.component';

@NgModule({
  declarations: [
    AppComponent, ProductCardComponent, FilterComponent,
    HeaderComponent, CartComponent, AccountComponent,
    LoginPageComponent, MainPageComponent,
    PharmacistPageComponent, ItemComponent, RegistrationPageComponent,
    ProductCardComponent, CartItemCardComponent, CartOrderCardComponent, AccountOrderCardComponent, 
    HeaderAuthorizedComponent, HeaderPharmacistComponent, HeaderUnauthorizedComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

