import { Component } from '@angular/core';

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
  selectedSpecialization = "";

  specializations = ['Специализация 1', 'Специализация 2', 'Специализация 3'];
  manufacturer: string;
  name: string;
  price: string;
  usage: string;
  dosage: string;
  ingredients: string;
  selectedImage: File;

  imageErrorMessage: string = '';
  imageErrorColor: string = '#EA455F';

  constructor() {
    this.selectedSpecialization = this.specializations[0];
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
      // Валидация наименования
    }
    if (!this.manufacturer){
      this.isValidManufacturer = false;
      // изготовитель: длина не более 100 символов латиницы/кириллицы/цифр/+тире/+процент
    }
    if (!this.price) {
      this.isValidPrice = false;
      // цена: положительное число
    }
    if (!this.usage) {
      this.isValidUsage = false;
      // способ применения, дозировка, действующие вещества: не более 500 символов
    }
    if (!this.dosage) {
      this.isValidDosage = false;
      // способ применения, дозировка, действующие вещества: не более 500 символов
    }
    if (!this.ingredients) {
      this.isValidIngredients = false;
      // способ применения, дозировка, действующие вещества: не более 500 символов
    }
  }

  refresh() {
    this.isValidName = true;
    this.isValidManufacturer = true;
    this.isValidPrice = true;
    this.isValidUsage = true;
    this.isValidDosage = true;
    this.isValidIngredients = true;
  }

  handleImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB
      if (file.size > maxSizeInBytes) {
        event.target.value = null;
        this.imageErrorMessage = 'Размер данного изображения больше 5 Мб';
        return;
      }

      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        this.imageErrorMessage = 'Неподдерживаемый тип изображения';
        event.target.value = null;
        return;
      }
      this.selectedImage = event.target.files[0];
    }
  }
}
