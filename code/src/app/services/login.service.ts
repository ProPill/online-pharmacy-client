import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
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

  async login(username: string, password: string): Promise<Map<number, number>> {
    const map = new Map<number, number>();
    try {
      // @ts-ignore
      const data = await this.http.post<IUser>(this.baseUrl + '/accounts/login?phone=' +
        '%2B' + username.substring(1) + '&password=' + password).toPromise();
      const user = this.transformUser(data);
      map.set(200, user.id);
    } catch (error) {
      map.set(400, 0);
      console.error('Error fetching items:', error);
    }
    console.log(map);
    return map;
  }
}
