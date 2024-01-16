import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PharmacistService {
   COMMON_TYPE = -1;
   RECEIPT_TYPE = -2;
   SPECIAL_TYPE = -3;

  constructor(private http: HttpClient) {}

  getAllSpecializations(): Map<number, string> {
    let url = "http://localhost:8080/api/speciality/all";
    let specialities: Map<number, string> = new Map<number, string>();
    this.http.get<any[]>(url).subscribe(
      data => {
        for (let i = 0; i < data.length; i++) {
          specialities.set(data[i].id, data[i].name);
        }
      },
      error => {
        console.error('Error fetching items:', error);
      }
    );
    return specialities;
  }

  addNewProduct(name: string, price: string, info:string, manufacturer: string, picture_url: File, type_id: number, speciality_id: number | null) {
    // let url = 'http://localhost:8080/api/item/add?';
    // url += "name=" + name + "&";
    // url += "price=" + price + "&";
    // url += "info=" + info + "&";
    // url += "manufacturer=" + manufacturer + "&";
    // url += "type_id=" + type_id.toString() + "&";
    // if (speciality_id !== null) {
    //   url += "speciality_id=" + speciality_id.toString();
    // }
    const url = 'http://localhost:8080/api/item/add';
    const params = new URLSearchParams();
    params.set('name', name);
    params.set('price', price);
    params.set('info', info);
    params.set('manufacturer', manufacturer);
    params.set('type_id', type_id.toString());

    if (speciality_id !== null) {
      params.set('speciality_id', speciality_id.toString());
    }

    const formData = new FormData();
    formData.append('picture_url', picture_url, picture_url.name);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    const fullUrl = `${url}?${params.toString()}`;

    console.log(url)
    let success = false;
    this.http.post<any>(fullUrl, formData, {headers}).subscribe(
      (data) => {
        console.log(data);
        success = true;
      },
      (error) => {
        console.error(error);
        success = false;
      }
    );

    return success;
  }
}
