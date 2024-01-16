import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PharmacistService {

  constructor(private http: HttpClient) {
  }

  getAllSpecializations(): Map<number, string>  {
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
}
