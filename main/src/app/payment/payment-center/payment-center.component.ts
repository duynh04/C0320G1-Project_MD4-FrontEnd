import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/shared/services/payment.service';
import { Router, NavigationEnd, NavigationStart, RoutesRecognized, GuardsCheckStart } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-payment-center',
  templateUrl: './payment-center.component.html',
  styleUrls: ['./payment-center.component.css']
})
export class PaymentCenterComponent implements OnInit {

  constructor(private router: Router) {
    // this.router.events.subscribe(event => {
    //   if (event instanceof GuardsCheckStart) {
    //     console.log('center-payment', event.id);
    //     console.log('center-payment', event.urlAfterRedirects);
    //   }
    //   // if (event.id == 1) {
    //   //   this.router.navigate(['../payment'])
    //   // }
    // });
  }

  ngOnInit() {
  }

}
