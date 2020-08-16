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
import { IPayPalConfig } from 'ngx-paypal';
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
  //paypal config
  public payPalConfig?: IPayPalConfig;
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
    // initialize paypal
    this.initPayPalSdk();
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
    this.subscr[1] = this.paymentService.getAddress('1').subscribe((user: DeliveryAddressDTO) => {
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
    if (this.isUpdate.value) {
      let deliveryAddress = this.addressForm.value as DeliveryAddress;
      console.log(deliveryAddress);
      deliveryAddress.id = this.address_id;
      deliveryAddress.user = { id: 1 };
      this.paymentService.updateLatestAddress(deliveryAddress).subscribe((res) => {
        console.log(`response ${res}`);
      })
    }
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

  private initPayPalSdk(): void {
    this.payPalConfig = {
      clientId: 'AbCzPUUevBpwehD2HBR8Y0_ic2rt8ldWn-y_nn7SgR04TvK3r9tLU9MZonzGDnXTq5exF5hlhdll6wMp',
      style: {
        layout: 'horizontal'
      },
      createOrderOnServer: (data: any) => {
        return this.paymentService.setTransaction({ totalPrice: 5000000 }).toPromise().then(res => {
          // console.log(res);
          this.paymentService.captureOrder = res;
          return res.id;
        });
      },
      onApprove: (data) => {
        this.paymentService.confirmTransaction(data.orderID).subscribe(res => {
          console.log(`confirm transaction: ${res.status}`);
        });
      },
      onError: err => {
        console.log('OnError', err);
      },
    };
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
