//creator: Nguyễn Xuân Hùng
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Location } from '../models/dtos/location';
import { IOrderDetails } from 'ngx-paypal'
import { DeliveryAddress } from './../models/delivery-address';
import { ErrorDetail } from './../models/dtos/error-detail';
import { DeliveryAddressDTO, OrderAddressInfo } from '../models/dtos/delivery-adddress-dto';
import { handler } from '../exceptions/exception-handler';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

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

  private userId;
  addressInfo: OrderAddressInfo;
  captureOrder: IOrderDetails;


  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) { }

  // Creator: DUY
  // get all cities/provinces in vietnam
  getCities(): Observable<Location[]> {
    return this.http.get<Location[]>(this.LOCATION_URL);
  }

  // Creator: DUY
  // get all districts
  getDistricts(cityName: string): Observable<Location[]> {
    return this.getCities().pipe(
      map((cities: Location[]) => {
        let districts: Location[] = cities.filter(val => val.name == cityName);
        return districts[0].huyen;
      })
    );
  }

  // Creator: DUY
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
    return this.http.get(this.API_INVOICE_URL + id);
  }

  // Creator: DUY
  //Get delivery address
  getAddress(): Observable<DeliveryAddressDTO> {
    return this.http.get<DeliveryAddressDTO>(`${this.PAYMENT_URL}/address/${this.tokenStorage.getJwtResponse().userId}`)
  }

  // Creator: DUY
  //Update address
  updateLatestAddress(addr: DeliveryAddress): Observable<ErrorDetail | null> {
    addr.user = { id: this.tokenStorage.getJwtResponse().userId };
    return this.http.put<ErrorDetail | null>(`${this.PAYMENT_URL}/address`, addr).pipe(
      catchError(handler)
    );
  }

  // Creator: DUY
  // get captured order
  setPayPalTransaction(deliveryMethod: string): Observable<IOrderDetails> {
    const transfer: ITransfer = {
      userId: this.tokenStorage.getJwtResponse().userId,
      deliveryMethod: deliveryMethod
    }
    return this.http.post<IOrderDetails>(`${this.PAYMENT_URL}/paypal-create`, transfer);
  }

  // Creator: DUY
  //get confirm transaction
  confirmPayPalTransaction(orderId: string): Observable<IOrderDetails> {
    return this.http.post<IOrderDetails>(`${this.PAYMENT_URL}/paypal-confirm`, orderId);
  }

  // Creator: DUY
  // get token for visa payment
  retrieveVisaToken(): Observable<string> {
    return this.http.get<any>(`${this.PAYMENT_URL}/visa-token`, this.httpOptions).pipe(
      map((res: { token: string }) => { return res.token })
    )
  }

  // Creator: DUY
  // create purchase visa payment
  createVisaTransaction(nonce: string, deliveryMethod: string): Observable<any> {
    const tranfer: ITransfer = {
      userId: this.tokenStorage.getJwtResponse().userId,
      nonce: nonce,
      deliveryMethod: deliveryMethod
    }
    return this.http.post<any>(`${this.PAYMENT_URL}/visa-create`, tranfer, this.httpOptions).pipe(
      catchError(handler)
    );
  }
}

export interface ITransfer {
  userId: number
  nonce?: string,
  deliveryMethod: string,
}
