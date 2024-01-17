import {NgModule} from "@angular/core";
import {MainPageComponent} from "../components/main-page/main-page.component";
import {LoginPageComponent} from "../components/login-page/login-page.component";
import {RouterModule, Routes} from "@angular/router";
import {ProductCardComponent} from "../components/product-card/product-card.component";
import {PharmacistPageComponent} from "../components/pharmacist-page/pharmacist-page.component";
import {CartComponent} from "../components/cart-page/cart.component";
import {HeaderUnauthorizedComponent} from "../components/header/header-unauthorized/header-unauthorized.component";
import {RegistrationPageComponent} from "../components/registration-page/registration-page.component";
import {AccountComponent} from "../components/user-page/account/account.component";
import {OrderPageComponent} from "../components/order-page/order-page.component";
import {ItemNotFoundComponent} from "../components/main-page/item-not-found/item-not-found.component";
import { pharmacistGuard } from '../guards/pharmacist-guard.service';
import {cartGuard} from "../guards/cart-guard.service";
import {orderGuard} from "../guards/order.guard";
import {authGuard} from "../guards/auth.guard";

const routes: Routes = [
  { path: 'main', component: MainPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'registration', component: RegistrationPageComponent },
  { path: 'product-page', component: ProductCardComponent },
  { path: 'item-not-found', component: ItemNotFoundComponent},
  { path: 'unauthorized', component: HeaderUnauthorizedComponent },

  { path: 'pharmacist', component: PharmacistPageComponent , canActivate: [pharmacistGuard]},
  { path: 'cart', component: CartComponent , canActivate: [cartGuard]},
  { path: 'user', component: AccountComponent, canActivate: [authGuard] },
  { path: 'order-page', component: OrderPageComponent , canActivate: [orderGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
