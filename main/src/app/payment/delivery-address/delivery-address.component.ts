import { Component, OnInit, OnDestroy } from '@angular/core';
import { PaymentService } from 'src/app/shared/services/payment.service';
import { Location } from '../../shared/models/dtos/location';
import { Observable, Subscription } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-delivery-address',
  templateUrl: './delivery-address.component.html',
  styleUrls: ['./delivery-address.component.css']
})
export class DeliveryAddressComponent implements OnInit, OnDestroy {

  cities: Location[];
  districts: Location[];
  wards: Location[];

  // subscription
  subscr: Subscription[] = [];
  //address form
  addressForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentService
  ) { }

  ngOnInit() {
    // initialize address form
    this.addressForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      city: [''],
      district: [''],
      ward: [''],
      street: [''],
      nation: ['Việt Nam'],
      email: [''],
      phoneNumber: [''],
      instruction: ['']
    });
    // get cities from json
    this.subscr[0] = this.paymentService.getCities().subscribe(
      (cities: Location[]) => {
        this.cities = cities;
      });
    this.addressForm.patchValue({
      city: 'Tỉnh Tiền Giang'
    })
  }

  onSubmit() {

  }

  onCityChange(cityName: string) {
    this.wards = [];
    this.subscr[1] = this.paymentService.getDistricts(cityName).subscribe(
      (districts: Location[]) => {
        this.districts = districts;
      });
  }

  onDistrictChange(cityName: string, districtName: string) {
    this.subscr[2] = this.paymentService.getAllWards(cityName, districtName).subscribe(
      (wards: Location[]) => {
        this.wards = wards;
      });
  }

  ngOnDestroy() {
    this.subscr.forEach(sub => {
      if (sub)
        sub.unsubscribe();
    })
  }
  // getter
  get firstName() {
    return this.addressForm.get('firstName');
  }
  get lastName() {
    return this.addressForm.get('lastName');
  }
  get city() {
    return this.addressForm.get('city');
  }
  get district() {
    return this.addressForm.get('district');
  }
  get ward() {
    return this.addressForm.get('ward');
  }
}
