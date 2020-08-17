//creator: Nguyễn Xuân Hùng
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Location } from '../models/dtos/location';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  //creator: Nguyễn Xuân Hùng
  private readonly API_INVOICE_URL = "http://localhost:8080/api/v1/payment/invoice/";
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: 'my-auth-token'
    })
  };

  private locationUrl = 'assets/locations.json';
  constructor(private http: HttpClient) { }

  // get all cities/provinces in vietnam
  getCities(): Observable<Location[]> {
    return this.http.get<Location[]>(this.locationUrl);
  }

  // get all districts
  getDistricts(cityName: string): Observable<Location[]> {
    return this.getCities().pipe(
      map((cities: Location[]) => {
        let districts: Location[] = cities.filter(val => val.name == cityName);
        return districts[0].huyen;
      })
    );
  }

  // get all wards
  getWards(cityName: string, districtName: string): Observable<Location[]> {
    return this.getDistricts(cityName).pipe(
      map((districts: Location[]) => {
        let wards = districts.filter(val => val.name == districtName);
        return wards[0].xa;
      })
    );
  }

  //creator: Nguyễn Xuân Hùng
  findInvoiceById(id) : Observable<any>{
    return this.http.get(this.API_INVOICE_URL+id);
  }
}
