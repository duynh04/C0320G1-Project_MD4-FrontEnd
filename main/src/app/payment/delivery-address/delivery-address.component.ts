import { Component, OnInit, OnDestroy } from '@angular/core';
import { PaymentService } from 'src/app/shared/services/payment.service';
import { Location } from '../../shared/models/dtos/location';
import { Observable, Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CartService } from 'src/app/shared/services/cart.service';
import { DeliveryAddress } from './../../shared/models/delivery-address';
import { Router, ActivatedRoute } from '@angular/router';
import { DELIVERRY_MESSAGES } from './../../shared/validations/error-messages';
import { validPhoneNumber } from 'src/app/shared/validations/custom-validators';

@Component({
  selector: 'app-delivery-address',
  templateUrl: './delivery-address.component.html',
  styleUrls: ['./delivery-address.component.css']
})
export class DeliveryAddressComponent implements OnInit, OnDestroy {

  // get error messages
  errors = DELIVERRY_MESSAGES;
  cities: Location[];
  districts: Location[];
  wards: Location[];

  // subscription
  subscr: Subscription[] = [];
  //address form
  addressForm: FormGroup;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cartService: CartService,
    private fb: FormBuilder,
    private paymentService: PaymentService
  ) { }

  ngOnInit() {
    // initialize address form
    this.addressForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      city: ['', [Validators.required]],
      district: ['', [Validators.required]],
      ward: ['', [Validators.required]],
      street: ['', [Validators.required, Validators.maxLength(30)]],
      nation: [''],
      email: [''],
      phoneNumber: ['', [Validators.required, validPhoneNumber]],
      instruction: ['']
    });
    // get cities from json
    this.subscr[0] = this.paymentService.getCities().subscribe(
      (cities: Location[]) => {
        this.cities = cities;
      });
    this.addressForm.patchValue({
      firstName: 'Duy',
      lastName: 'Nguyen',
      city: '',
      district: '',
      ward: '',
      street: '',
      nation: 'Việt Nam',
      email: 'abc@gmail.com',
      phoneNumber: '',
    })
  }

  onSubmit() {
    let deliveryAddress = this.addressForm.value as DeliveryAddress;
  }

  onCityChange(cityName: string) {
    this.wards = [];
    this.addressForm.patchValue({
      district: '',
      ward: ''
    });
    this.subscr[1] = this.paymentService.getDistricts(cityName).subscribe(
      (districts: Location[]) => {
        this.districts = districts;
      });
  }

  onDistrictChange(cityName: string, districtName: string) {
    this.addressForm.patchValue({
      ward: ''
    });
    this.subscr[2] = this.paymentService.getWards(cityName, districtName).subscribe(
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
  get nation() {
    return this.addressForm.get('nation');
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
  get street() {
    return this.addressForm.get('street');
  }
  get email() {
    return this.addressForm.get('email');
  }
  get phoneNumber() {
    return this.addressForm.get('phoneNumber');
  }
}
