import { TestBed, async } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { MainPageComponent } from '../components/main-page/main-page.component';
import { LoginPageComponent } from '../components/login-page/login-page.component';
import { RegistrationPageComponent } from '../components/registration-page/registration-page.component';
import { ProductCardComponent } from '../components/product-card/product-card.component';
import { ItemNotFoundComponent } from '../components/main-page/item-not-found/item-not-found.component';
import { HeaderUnauthorizedComponent } from '../components/header/header-unauthorized/header-unauthorized.component';
import { PharmacistPageComponent } from '../components/pharmacist-page/pharmacist-page.component';
import { CartComponent } from '../components/cart-page/cart.component';
import { AccountComponent } from '../components/user-page/account/account.component';
import { OrderPageComponent } from '../components/order-page/order-page.component';

import { of } from 'rxjs';
import {routes} from "./routes";

// Создаем фейковый guard для тестирования
class FakeGuard {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return of(true); // Возвращаем обещание (promise), чтобы симулировать результат canActivate
  }
}

describe('AppRoutingModule', () => {
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [
        MainPageComponent,
        LoginPageComponent,
        RegistrationPageComponent,
        ProductCardComponent,
        ItemNotFoundComponent,
        HeaderUnauthorizedComponent,
        PharmacistPageComponent,
        CartComponent,
        AccountComponent,
        OrderPageComponent
      ],
      providers: [
        { provide: FakeGuard, useClass: FakeGuard },
      ]
    });
    router = TestBed.inject(Router);
  });

  it('should navigate to main page', async(() => {
    router.navigate(['/main']).then(() => {
      expect(router.url).toBe('/main');
    });
  }));

  it('should navigate to login page', async(() => {
    router.navigate(['/login']).then(() => {
      expect(router.url).toBe('/login');
    });
  }));

  it('should navigate to registration page', async(() => {
    router.navigate(['/registration']).then(() => {
      expect(router.url).toBe('/registration');
    });
  }));

  it('should navigate to product page', async(() => {
    router.navigate(['/product-page']).then(() => {
      expect(router.url).toBe('/product-page');
    });
  }));

  it('should navigate to item not found page', async(() => {
    router.navigate(['/item-not-found']).then(() => {
      expect(router.url).toBe('/item-not-found');
    });
  }));

  it('should navigate to unauthorized header page', async(() => {
    router.navigate(['/unauthorized']).then(() => {
      expect(router.url).toBe('/unauthorized');
    });
  }));

  it('should navigate to pharmacist page', async(() => {
    router.navigate(['/pharmacist']).then(() => {
      expect(router.url).toBe('/pharmacist');
    });
  }));

  it('should navigate to cart page', async(() => {
    router.navigate(['/cart']).then(() => {
      expect(router.url).toBe('/cart');
    });
  }));

  it('should navigate to user account page', async(() => {
    router.navigate(['/user']).then(() => {
      expect(router.url).toBe('/user');
    });
  }));

  it('should navigate to order page', async(() => {
    router.navigate(['/order-page']).then(() => {
      expect(router.url).toBe('/order-page');
    });
  }));

});
