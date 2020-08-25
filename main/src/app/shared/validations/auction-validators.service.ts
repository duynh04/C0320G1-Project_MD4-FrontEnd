import { AuctionService } from './../services/auction.service';
import { AbstractControl } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuctionValidatorsService {

  constructor() { }

  // this.fetchInfo.getHighestPrice(1).subscribe(data => {

    //   if (price < data) {
    //     check = true;
    //   }
    //   return check? {smallBid: true} : null;
    // })

  bidValidator(control: AbstractControl){
    
    
    const price = control.value;  
    let check: boolean = false;
    if(isNaN(price) ||  price < 0){
      check = true;
    }    

    return check? {bidPrice: true} : null;   
  }
}
