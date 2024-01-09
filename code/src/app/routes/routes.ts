import {MainPageComponent} from "../components/main-page/main-page.component";
import {LoginPageComponent} from "../components/login-page/login-page.component";
import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ProductCardComponent} from "../components/product-card/product-card.component";
import {PharmacistPageComponent} from "../components/pharmacist-page/pharmacist-page.component";
import {CartComponent} from "../components/cart-page/cart.component";
import {HeaderUnauthorizedComponent} from "../components/header/header-unauthorized/header-unauthorized.component";
import {RegistrationPageComponent} from "../components/registration-page/registration-page.component";
import {AccountComponent} from "../components/user-page/account/account.component";

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'main', component: MainPageComponent },
  { path: 'product-page', component: ProductCardComponent },
  { path: 'pharmacist', component: PharmacistPageComponent },
  { path: 'registration', component: RegistrationPageComponent },
  { path: 'cart', component: CartComponent },
  { path: 'user', component: AccountComponent },
  { path: 'unauthorized', component: HeaderUnauthorizedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
