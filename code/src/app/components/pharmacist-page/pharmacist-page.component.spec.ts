import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { PharmacistPageComponent } from './pharmacist-page.component';
import { PharmacistService } from '../../services/pharmacist.service';
import { UserService } from '../../services/user.service';
import {of} from "rxjs";

describe('PharmacistPageComponent', () => {
  let component: PharmacistPageComponent;
  let fixture: ComponentFixture<PharmacistPageComponent>;
  let router: Router;
  let pharmacistServiceSpy: jasmine.SpyObj<PharmacistService>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  const file = new File(['dummy content'], 'dummy.jpg', { type: 'image/jpeg' });

  beforeEach(() => {
    pharmacistServiceSpy = jasmine.createSpyObj('PharmacistService', ['getAllSpecializations', 'addNewProduct']);
    userServiceSpy = jasmine.createSpyObj('UserService', ['currentUserId']);

    TestBed.configureTestingModule({
      declarations: [PharmacistPageComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: PharmacistService, useValue: pharmacistServiceSpy },
        { provide: UserService, useValue: { currentUserId: of(null) } },
      ],
    });

    fixture = TestBed.createComponent(PharmacistPageComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should toggle list visibility', () => {
    expect(component.isListHidden).toBeFalse();
    component.toggleList();
    expect(component.isListHidden).toBeTrue();
    component.toggleList();
    expect(component.isListHidden).toBeFalse();
  });

  it('should set isSpecialisationOn and isReceipt accordingly', () => {
    expect(component.isSpecialisationOn).toBeFalse();
    expect(component.isReceipt).toBeFalse();

    component.setSpecialisation();
    expect(component.isSpecialisationOn).toBeTrue();
    expect(component.isReceipt).toBeFalse();

    component.setReceipt();
    expect(component.isSpecialisationOn).toBeFalse();
    expect(component.isReceipt).toBeTrue();
  });

  it('should handle specialization click', () => {
    const specialization = 'Some Specialization';
    component.handleSpecializationClick(specialization);
    expect(component.selectedSpecialization).toBe(specialization);
    expect(component.isValidSpecialisation).toBeTrue();
    expect(component.isListHidden).toBeTrue();
  });

  it('should handle image upload', () => {
    const event = { target: { files: [file] } } as any;

    component.handleImageUpload(event);

    expect(component.selectedImage).toBe(file);
    expect(component.isValidImageUrl).toBeTrue();
  });

  it('should set isValidName and NAME_ERROR_MESSAGE when name is not provided', () => {
    component.name = '';
    component.onAddReceipt();
    expect(component.isValidName).toBeFalse();
    expect(component.NAME_ERROR_MESSAGE).toBe(component.EMPTY_FIELD_ERROR);
  });

  it('should set isValidName to false when name contains invalid characters or exceeds 100 characters', () => {
    component.name = '!@#';
    component.onAddReceipt();
    expect(component.isValidName).toBeFalse();

    component.name = 'a'.repeat(101);
    component.onAddReceipt();
    expect(component.isValidName).toBeFalse();
  });

  it('should navigate to main page if all validations pass', () => {
    spyOn(router, 'navigate');
    component.name = 'ValidName';
    component.manufacturer = 'ValidManufacturer';
    component.price = '50.00';
    component.usage = 'ValidUsage';
    component.dosage = 'ValidDosage';
    component.ingredients = 'ValidIngredients';
    component.selectedImage = file;

    pharmacistServiceSpy.addNewProduct.and.returnValue(true);

    component.onAddReceipt();
    expect(router.navigate).toHaveBeenCalledWith(['/main']);  });

  it('should return null if selectedSpecialization is not found in specializations', () => {
    component.specializations = new Map<number, string>([
      [1, 'Specialization1'],
      [2, 'Specialization2'],
      [3, 'Specialization3'],
    ]);
    component.selectedSpecialization = 'NonExistentSpecialization';

    const result = component['getSpecialityByName']();

    expect(result).toBeNull();
  });

  it('should return the correct speciality_id if selectedSpecialization is found in specializations', () => {
    component.specializations = new Map<number, string>([
      [1, 'Specialization1'],
      [2, 'Specialization2'],
      [3, 'Specialization3'],
    ]);
    component.selectedSpecialization = 'Specialization2';

    const result = component['getSpecialityByName'](); // обратите внимание на использование []

    expect(result).toEqual(2);
  });

  it('should refresh data', fakeAsync(() => {
    component.refresh();
    tick();

    expect(component.isValidName).toBeTrue();
    expect(component.isValidManufacturer).toBeTrue();
    expect(component.isValidPrice).toBeTrue();
    expect(component.isValidType).toBeTrue();
    expect(component.isStringLengthValidUsage).toBeTrue();
    expect(component.isStringLengthValidDosage).toBeTrue();
    expect(component.isStringLengthValidIngredients).toBeTrue();
    expect(component.isValidSpecialisation).toBeTrue();
    expect(component.isValidImageUrl).toBeTrue();
    expect(component.isValidSpecialisation).toBeTrue();

    expect(component.NAME_ERROR_MESSAGE).toContain("Недопустимы все символы, кроме кириллицы, латиницы, а также цифр и %, -. Максимальное количество символов: 100.");
    expect(component.MANUFACTURER_ERROR_MESSAGE).toContain("Недопустимы все символы, кроме кириллицы, латиницы, а также цифр и %, -, ");
    expect(component.PRICE_ERROR_MESSAGE).toContain("Цена: положительное число");
    expect(component.USAGE_ERROR_MESSAGE).toContain("Превышено максимальное число символов: 500");
    expect(component.DOSAGE_ERROR_MESSAGE).toContain("Превышено максимальное число символов: 500");
    expect(component.INGREDIENTS_ERROR_MESSAGE).toContain("Превышено максимальное число символов: 500");
  }));
});
