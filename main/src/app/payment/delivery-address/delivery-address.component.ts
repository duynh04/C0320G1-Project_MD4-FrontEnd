import { Component, OnInit, OnDestroy } from '@angular/core';
import { PaymentService } from 'src/app/shared/services/payment.service';
import { Location } from '../../shared/models/dtos/location';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CartService } from 'src/app/shared/services/cart.service';
import { DeliveryAddress } from './../../shared/models/delivery-address';
import { Router, ActivatedRoute } from '@angular/router';
import { DELIVERRY_MESSAGES } from './../../shared/validations/error-messages';
import { validPhoneNumber } from 'src/app/shared/validations/custom-validators';
import { DeliveryAddressDTO } from 'src/app/shared/models/dtos/delivery-adddress-dto';

@Component({
  selector: 'app-delivery-address',
  templateUrl: './delivery-address.component.html',
  styleUrls: ['./delivery-address.component.css']
})
export class DeliveryAddressComponent implements OnInit, OnDestroy {

  //cart info
  public total: number;
  // address_id
  private address_id: number;

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
    //Get total
    this.total = this.cartService.totalPrice;
    // get cities from json
    this.subscr[0] = this.paymentService.getCities().subscribe(
      (cities: Location[]) => {
        this.cities = cities;
      });
    // initialize address form
    this.addressForm = this.fb.group({
      fullName: [''],
      city: ['', [Validators.required]],
      district: ['', [Validators.required]],
      ward: ['', [Validators.required]],
      street: ['', [Validators.required, Validators.maxLength(30)]],
      nation: [''],
      email: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, validPhoneNumber]],
      instruction: [''],
      isUpdate: [false]
    });
    this.subscr[1] = this.paymentService.getAddress('12').subscribe((user: DeliveryAddressDTO) => {
      if (user.addresses.length == 0) {
        this.addressForm.patchValue({
          fullName: user.fullname,
          email: user.email,
          nation: 'Việt Nam'
        })
      } else {
        this.address_id = user.addresses[0].id;
        this.onCityChange(user.addresses[0].city);
        this.onDistrictChange(user.addresses[0].city, user.addresses[0].district);
        this.addressForm.patchValue({
          fullName: user.fullname,
          city: user.addresses[0].city,
          district: user.addresses[0].district,
          ward: user.addresses[0].ward,
          street: user.addresses[0].street,
          nation: user.addresses[0].nation,
          email: user.email,
          phoneNumber: user.addresses[0].phoneNumber,
        })
      }

    });
  }

  onSubmit() {
    let deliveryAddress = this.addressForm.value as DeliveryAddress;
    deliveryAddress.id = this.address_id;
    if (this.isUpdate.value) {
      // deliveryAddress.phoneNumber = "01234413413";
      deliveryAddress.user = { id: 12 };
      this.paymentService.updateLatestAddress(deliveryAddress).subscribe((res) => {
        if (res != null) {
          console.log(res);
        }
      })
    }
    this.paymentService.addressInfo = this.addressForm.value;
    this.router.navigate(['option'], { relativeTo: this.route })
  }

  onCityChange(cityName: string) {
    this.wards = [];
    this.addressForm.patchValue({
      district: '',
      ward: ''
    });
    this.subscr[2] = this.paymentService.getDistricts(cityName).subscribe(
      (districts: Location[]) => {
        this.districts = districts;
      });
  }

  onDistrictChange(cityName: string, districtName: string) {
    this.addressForm.patchValue({
      ward: ''
    });
    this.subscr[3] = this.paymentService.getWards(cityName, districtName).subscribe(
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

  autoTrim(field, $event) {
    if (field == 'street') {
      this.addressForm.patchValue({
        street: ($event.target.value as string).trim()
      });
    } else {
      this.addressForm.patchValue({
        phoneNumber: ($event.target.value as string).trim()
      });
    }
  }
  // getter

  get fullName() {
    return this.addressForm.get('fullName');
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
  get isUpdate() {
    return this.addressForm.get('isUpdate');
  }
}
