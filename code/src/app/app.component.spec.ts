import {ComponentFixture, TestBed} from '@angular/core/testing';
import { AppComponent } from './app.component';
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "./routes/routes";
import {FormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HeaderComponent} from "./components/header/header.component";
import {FilterComponent} from "./components/filter/filter.component";
import {HeaderUnauthorizedComponent} from "./components/header/header-unauthorized/header-unauthorized.component";
import {HeaderPharmacistComponent} from "./components/header/header-pharmacist/header-pharmacist.component";
import {HeaderAuthorizedComponent} from "./components/header/header-authorized/header-authorized.component";

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent,
        FilterComponent,
        HeaderUnauthorizedComponent,
        HeaderPharmacistComponent,
        HeaderAuthorizedComponent],
      imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientTestingModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'ProPill'`, () => {
    expect(component.title).toEqual('ProPill');
  });

  it('should render the title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('ProPill');
  });
});
