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
      declarations: [AppComponent,
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

// import { TestBed, ComponentFixture } from '@angular/core/testing';
// import { PharmacistPageComponent } from './pharmacist-page.component';
// import { UserService } from '../../services/user.service';
// import { PharmacistService } from '../../services/pharmacist.service';
// import { RouterTestingModule } from '@angular/router/testing';
// import { HttpClientModule } from '@angular/common/http';
// import { FormsModule } from '@angular/forms';
//
// describe('PharmacistPageComponent', () => {
//   let component: PharmacistPageComponent;
//   let fixture: ComponentFixture<PharmacistPageComponent>;
//
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [PharmacistPageComponent],
//       imports: [RouterTestingModule, HttpClientModule, FormsModule],
//       providers: [UserService, PharmacistService]
//     }).compileComponents();
//   });
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(PharmacistPageComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('should create the component', () => {
//     expect(component).toBeTruthy();
//   });
//
//   it('should toggle list visibility', () => {
//     const initialListHiddenValue = component.isListHidden;
//     component.toggleList();
//     expect(component.isListHidden).toBe(!initialListHiddenValue);
//   });
//
//   it('should set specialisation state', () => {
//     component.setSpecialisation();
//     expect(component.isSpecialisationOn).toBeTrue();
//     expect(component.isReceipt).toBeFalse();
//   });
//
//   it('should set receipt state', () => {
//     component.setReceipt();
//     expect(component.isReceipt).toBeTrue();
//     expect(component.isSpecialisationOn).toBeFalse();
//   });
//
//   it('should handle specialization click', () => {
//     const specialization = 'Test Specialization';
//     component.handleSpecializationClick(specialization);
//     expect(component.selectedSpecialization).toEqual(specialization);
//     expect(component.isValidSpecialisation).toBeTrue();
//     expect(component.isListHidden).toBeFalse();
//   });
//
//   it('should validate name field for invalid characters', () => {
//     component.name = 'Test@Name';
//     component.onAddReceipt();
//     expect(component.isValidName).toBeFalse();
//   });
//
//   it('should validate manufacturer field for empty input', () => {
//     component.manufacturer = '';
//     component.onAddReceipt();
//     expect(component.isValidManufacturer).toBeFalse();
//   });
//
//   it('should validate price field for negative value', () => {
//     component.price = '-10.00';
//     component.onAddReceipt();
//     expect(component.isValidPrice).toBeFalse();
//   });
//
//   it('should validate usage field for exceeding maximum length', () => {
//     component.usage = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
//     component.onAddReceipt();
//     expect(component.isStringLengthValidUsage).toBeFalse();
//   });
//
//   it('should validate dosage field for empty input', () => {
//     component.dosage = '';
//     component.onAddReceipt();
//     expect(component.isStringLengthValidDosage).toBeFalse();
//   });
//
//   it('should validate ingredients field for empty input', () => {
//     component.ingredients = '';
//     component.onAddReceipt();
//     expect(component.isStringLengthValidIngredients).toBeFalse();
//   });
//
//   it('should validate image upload for unsupported type', () => {
//     const event = {
//       target: {
//         files: [new File([''], 'test.txt', { type: 'text/plain' })]
//       }
//     };
//     component.handleImageUpload(event);
//     expect(component.isValidImageUrl).toBeFalse();
//   });
//
//
//
//
//
//   it('should add new product for common type', () => {
//     component.name = 'Test Name';
//     component.manufacturer = 'Test Manufacturer';
//     component.price = '10.00';
//     component.usage = 'Test Usage';
//     component.dosage = 'Test Dosage';
//     component.ingredients = 'Test Ingredients';
//     component.selectedImage = new File([''], 'test.jpg', { type: 'image/jpeg' });
//
//     spyOn(component.pharmacistService, 'addNewProduct').and.returnValue(true);
//     spyOn(component.router, 'navigate');
//
//     component.onAddReceipt();
//
//     expect(component.pharmacistService.addNewProduct).toHaveBeenCalledOnceWith(
//       component.name, component.price, `${component.usage} ${component.dosage} ${component.ingredients}`,
//       component.manufacturer, component.selectedImage, component.pharmacistService.COMMON_TYPE, null
//     );
//     expect(component.router.navigate).toHaveBeenCalledWith(['/main']);
//   });
//
//   it('should handle image upload without selecting any image', () => {
//     const event = {
//       target: {
//         files: []
//       }
//     };
//     component.handleImageUpload(event);
//     expect(component.isValidImageUrl).toBeFalse();
//   });
//
// });
//
//
// import {ComponentFixture, TestBed} from '@angular/core/testing';
// import { AppComponent } from './app.component';
// import {BrowserModule} from "@angular/platform-browser";
// import {AppRoutingModule} from "./routes/routes";
// import {FormsModule} from "@angular/forms";
// import {HttpClientTestingModule} from "@angular/common/http/testing";
// import {HeaderUnauthorizedComponent} from "./components/header/header-unauthorized/header-unauthorized.component";
// import {HeaderPharmacistComponent} from "./components/header/header-pharmacist/header-pharmacist.component";
// import {HeaderAuthorizedComponent} from "./components/header/header-authorized/header-authorized.component";
// import {HeaderComponent} from "./components/header/header.component";
// import {FilterComponent} from "./components/filter/filter.component";
//
// describe('AppComponent', () => {
//   let fixture: ComponentFixture<AppComponent>;
//   let component: AppComponent;
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [AppComponent,
//         HeaderComponent,
//         FilterComponent,
//         HeaderUnauthorizedComponent,
//         HeaderPharmacistComponent,
//         HeaderAuthorizedComponent],
//       imports: [
//         BrowserModule,
//         AppRoutingModule,
//         FormsModule,
//         HttpClientTestingModule
//       ],
//     }).compileComponents();
//   });
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(AppComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('should create the app', () => {
//     expect(component).toBeTruthy();
//   });
//
//   it(`should have as title 'ProPill'`, () => {
//     expect(component.title).toEqual('ProPill');
//   });
//
//   it('should render the title', () => {
//     const compiled = fixture.nativeElement as HTMLElement;
//     expect(compiled.querySelector('.content span')?.textContent).toContain('ProPill');
//   });
// });
