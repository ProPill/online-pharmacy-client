import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {pharmacies} from "../../data/pharmacies";
import {PharmacistService} from "../../services/pharmacist.service";

@Component({
  selector: 'app-pharmacist-page',
  templateUrl: './pharmacist-page.component.html',
  styleUrls: ['./pharmacist-page.component.css']
})
export class PharmacistPageComponent {
  isListHidden = false;
  isSpecialisationOn = false;
  isReceipt = false;

  isValidName: boolean = true;
  isValidManufacturer: boolean = true;
  isValidPrice: boolean = true;
  isValidUsage: boolean = true;
  isValidDosage: boolean = true;
  isValidIngredients: boolean = true;
  isStringLengthValidUsage: boolean = true;
  isStringLengthValidDosage: boolean = true;
  isStringLengthValidIngredients: boolean = true;
  isValidType: boolean = true;
  selectedSpecialization: string = "";

  specializations: Map<number, string>;
  manufacturer: string;
  name: string ;
  price: string;
  usage: string;
  dosage: string;
  ingredients: string;
  selectedImage: File;

  imageErrorMessage: string = '';
  imageErrorColor: string = '#ff0000';

  NAME_ERROR_MESSAGE = "Недопустимы все символы, кроме кириллицы, латиницы, а также цифр и %, -. Максимальное количество символов: 100.";
  MANUFACTURER_ERROR_MESSAGE = "Недопустимы все символы, кроме кириллицы, латиницы, а также цифр и %, -, ";
  PRICE_ERROR_MESSAGE = "Цена: положительное число";
  USAGE_ERROR_MESSAGE = "Превышено максимальное число символов: 500";
  DOSAGE_ERROR_MESSAGE = "Превышено максимальное число символов: 500";
  INGREDIENTS_ERROR_MESSAGE = "Превышено максимальное число символов: 500";
  EMPTY_FIELD_ERROR = "Поле не должно быть пустым";

  private userId: number = -1;
  private info: string;

  constructor(private userService: UserService, private router: Router, private pharmacistService: PharmacistService) {
    this.userService.currentUserId.subscribe((userId) => (this.userId = userId));
  }

  ngOnInit(){
    this.specializations = this.pharmacistService.getAllSpecializations();
  }

  toggleList() {
    this.isListHidden = !this.isListHidden;
  }

  setSpecialisation() {
    this.isSpecialisationOn = !this.isSpecialisationOn;
  }

  setReceipt() {
    this.isReceipt = !this.isReceipt;
  }

  handleSpecializationClick(specialization: string) {
    this.selectedSpecialization = specialization;
    this.toggleList();
  }

  onAddReceipt() {
    if (!this.name) {
      this.isValidName = false;
      this.NAME_ERROR_MESSAGE = this.EMPTY_FIELD_ERROR;
    } else if (!/^[a-zA-Zа-яА-Я0-9%\-]+$/i.test(this.name) || this.name.length > 100) {
      this.isValidName = false;
    }

    if (!this.manufacturer) {
      this.isValidManufacturer = false;
      this.MANUFACTURER_ERROR_MESSAGE = this.EMPTY_FIELD_ERROR;
    } else if (!/^[a-zA-Zа-яА-Я0-9%\-]+$/i.test(this.manufacturer)) {
      this.isValidManufacturer = false;
    }

    if (!this.price) {
      this.isValidPrice = false;
      this.PRICE_ERROR_MESSAGE = this.EMPTY_FIELD_ERROR;
    } else {
      const priceAsFloat = parseFloat(this.price);
      if (isNaN(priceAsFloat)) {
        this.isValidType = false;
      } else if (priceAsFloat <= 0.00) {
        this.isValidPrice = false;
      }
    }

    if (!this.usage) {
      this.isStringLengthValidUsage = false;
      this.USAGE_ERROR_MESSAGE = this.EMPTY_FIELD_ERROR;
    } else if (this.usage.length > 500) {
      this.isStringLengthValidUsage = false;
    }

    if (!this.dosage) {
      this.isStringLengthValidDosage = false;
      this.DOSAGE_ERROR_MESSAGE = this.EMPTY_FIELD_ERROR;
    } else if (this.dosage.length > 500) {
      this.isStringLengthValidDosage = false;
    }

    if (!this.ingredients) {
      this.isStringLengthValidIngredients = false;
      this.INGREDIENTS_ERROR_MESSAGE = this.EMPTY_FIELD_ERROR;
    } else if (this.ingredients.length > 500) {
      this.isStringLengthValidIngredients = false;
    }

    if (!this.isValidName || !this.isValidManufacturer || !this.isValidPrice ||
      !this.isValidUsage || !this.isValidDosage || !this.isValidIngredients ||
      !this.isStringLengthValidUsage || !this.isStringLengthValidDosage ||
      !this.isStringLengthValidIngredients || !this.isValidType) {
      return;
    }

    let speciality_id = null;
    for (let [key, value] of this.specializations.entries()) {
      if (this.selectedSpecialization === value) {
        speciality_id = key;
        break;
      }
    }

    this.info = this.usage + this.dosage + this.ingredients;

    this.pharmacistService.addNewProduct(this.name, this.price, this.info, this.manufacturer, this.selectedImage, -3, speciality_id);

    // adding endpoint
    this.router.navigate(['/main']);

  }

  refresh() {
    this.isValidName = true;
    this.isValidManufacturer = true;
    this.isValidPrice = true;
    this.isValidType = true;
    this.isStringLengthValidUsage = true;
    this.isStringLengthValidDosage = true;
    this.isStringLengthValidIngredients = true;

    this.NAME_ERROR_MESSAGE = "Недопустимы все символы, кроме кириллицы, латиницы, а также цифр и %, -. Максимальное количество символов: 100."
    this.MANUFACTURER_ERROR_MESSAGE = "Недопустимы все символы, кроме кириллицы, латиницы, а также цифр и %, -, "
    this.PRICE_ERROR_MESSAGE = "Цена: положительное число"
    this.USAGE_ERROR_MESSAGE = "Превышено максимальное число символов: 500"
    this.DOSAGE_ERROR_MESSAGE = "Превышено максимальное число символов: 500"
    this.INGREDIENTS_ERROR_MESSAGE = "Превышено максимальное число символов: 500"
  }

  handleImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];

      if (!allowedTypes.includes(file.type)) {
        this.imageErrorMessage = 'Неподдерживаемый тип изображения';
        event.target.value = null;
        return;
      }

      if (file.size > maxSizeInBytes) {
        event.target.value = null;
        this.imageErrorMessage = 'Размер данного изображения больше 5 Мб';
        return;
      }

      this.selectedImage = event.target.files[0];

    }
  }
}
