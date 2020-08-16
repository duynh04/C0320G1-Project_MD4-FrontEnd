import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Location } from '../models/dtos/location';
import { IOrderDetails } from 'ngx-paypal'
import { DeliveryAddress } from './../models/delivery-address';
import { ErrorDetail } from './../models/dtos/error-detail';
import { DeliveryAddressDTO } from '../models/dtos/delivery-adddress-dto';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  captureOrder: IOrderDetails;
  paymentUrl = "http://localhost:8080/api/v1/payment";

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

  //Get delivery address
  getAddress(userId: string): Observable<DeliveryAddressDTO> {
    return this.http.get<DeliveryAddressDTO>(`${this.paymentUrl}/address/${userId}`)
  }

  //Update address
  updateLatestAddress(addr: DeliveryAddress): Observable<ErrorDetail | null> {
    return this.http.put<ErrorDetail | null>(`${this.paymentUrl}/address`, addr);
  }

  // create order 
  // get captured order
  setTransaction(cart: { totalPrice: number }): Observable<IOrderDetails> {
    return this.http.post<IOrderDetails>(`${this.paymentUrl}/create-transaction`, cart);
  }

  //get confirm transaction 
  confirmTransaction(orderId: string): Observable<IOrderDetails> {
    return this.http.post<IOrderDetails>(`${this.paymentUrl}/confirm-transaction`, orderId);
  }
}
