import { Injectable } from '@angular/core';
import {IUser} from "../models/user";
import {HttpClient} from "@angular/common/http";
import {LoginService} from "./login.service";
import {PharmacistService} from "./pharmacist.service";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private baseUrl = 'http://localhost:8080/api';
  constructor(private http: HttpClient) {
  }

  transformUser(data: any) {
    const user: IUser = {
      id: data.id,
      name: data.full_name,
      phone: data.phone,
      roleId: data.role.id,
      specialityId: data.speciality_id
    };
    return user;
  }

  async registration(full_name: string, phone: string, password: string): Promise <Map <number, number> > {
    const map = new Map<number, number>();
    try {
      // @ts-ignore
      const data = await this.http.post<IUser>(this.baseUrl + '/accounts/registry?full_name=' + full_name +
        '&phone=' + '%2B' + phone.substring(1) + '&password=' + password).toPromise();
      const user = this.transformUser(data);
      map.set(200, user.id)
    } catch (error) {
      const errorWithMessage = error as { error?: { message?: string } };

      if (errorWithMessage.error && errorWithMessage.error.message) {
        const errorMessage = errorWithMessage.error.message;
        console.error('Server error message:', errorMessage);
        if (errorMessage == 'INVALID_FIO') {
          map.set(1, 1)
        }
        else if (errorMessage == 'INVALID_PHONE') {
          map.set(2, 1)
        }
        else if (errorMessage == 'INVALID_PASSWORD') {
          map.set(3, 1)
        }
        else if (errorMessage == 'PHONE_IS_REGISTERED') {
          map.set(409, 1)
        }
      }
      else {
        console.error('Error fetching items:', error);
      }
    }
    return map;
  }
}
