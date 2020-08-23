import {TokenStorageService} from './../../auth/token-storage.service';
//creator: Nguyễn Xuân Hùng
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Location} from '../models/dtos/location';
import {IOrderDetails} from 'ngx-paypal';
import {DeliveryAddress} from './../models/delivery-address';
import {ErrorDetail} from './../models/dtos/error-detail';
import {DeliveryAddressDTO, OrderAddressInfo} from '../models/dtos/delivery-adddress-dto';
import {handler} from '../exceptions/exception-handler';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  //creator: Nguyễn Xuân Hùng
  private readonly API_INVOICE_URL = "http://localhost:8080/api/v1/payment/invoice/";

  private readonly LOCATION_URL = 'assets/locations.json';

  private readonly PAYMENT_URL = "http://localhost:8080/api/v1/payment";

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  addressInfo: OrderAddressInfo;
  captureOrder: IOrderDetails;


  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) { }

  // get all cities/provinces in vietnam
  getCities(): Observable<Location[]> {
    return this.http.get<Location[]>(this.LOCATION_URL, this.httpOptions);
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
  findInvoiceById(id): Observable<any> {
    return this.http.get(this.API_INVOICE_URL + id, this.httpOptions);
  }
  //Get delivery address
  getAddress(userId: string): Observable<DeliveryAddressDTO> {
    return this.http.get<DeliveryAddressDTO>(`${this.PAYMENT_URL}/address/${userId}`, this.httpOptions)
  }

  //Update address
  updateLatestAddress(addr: DeliveryAddress): Observable<ErrorDetail | null> {
    return this.http.put<ErrorDetail | null>(`${this.PAYMENT_URL}/address`, addr, this.httpOptions).pipe(
      catchError(handler)
    );
  }

  // create order
  // get captured order
  setTransaction(userId: number, deliveryMethod: string): Observable<IOrderDetails> {
    return this.http.post<IOrderDetails>(`${this.PAYMENT_URL}/create-transaction`, userId, this.httpOptions);
  }

  //get confirm transaction
  confirmTransaction(orderId: string): Observable<IOrderDetails> {
    return this.http.post<IOrderDetails>(`${this.PAYMENT_URL}/confirm-transaction`, orderId, this.httpOptions);
  }

  // Creator: DUY
  // get token for visa payment
  retrieveToken(): Observable<string> {
    return this.http.get<any>(`${this.PAYMENT_URL}/visa-token`, this.httpOptions).pipe(
      map((res: { token: string }) => { return res.token })
    )
  }

  // create purchase visa payment
  createTransaction(nonce: string, deliveryMethod: string): Observable<any> {
    return this.http.get(`${this.PAYMENT_URL}/visa-create`, { params: { nonce: nonce, userId: '12', deliveryMethod: deliveryMethod }, headers: this.httpOptions.headers }).pipe(
      catchError(handler)
    );
  }


}
