import { WebsocketService } from './../../websocket.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, AbstractControl } from '@angular/forms';
import { AuctionService } from 'src/app/shared/services/auction.service';
import { ActivatedRoute } from '@angular/router';
import { AuctionRecord } from 'src/app/shared/models/auction-record';
import { User } from 'src/app/shared/models/user';


const socket = io('http://localhost:3000');


// Creator: Hoai Ngan team C
// const startingHour = 0;
// const startingMin = 1;

let endtime;
let remaningTime;
let t;
let loop;
let loop1;
let countdownEl;
let biddingPrice;
let original;
let button;
let currentBid;
let endAuctionvar;

declare var $: any;


@Component({
  selector: 'app-auction-page',
  templateUrl: './auction-page.component.html',
  styleUrls: ['./auction-page.component.css']
})
export class AuctionPageComponent implements OnInit {

  private newBid: FormControl;
  private records;
  private finalRecord;
  private productName;
  private currentBid;
  private increment;
  private currentWinner;
  private auctionId;
  private auction;
  private bidder;
  private productImages;
  private imagesExceptFirst;
  private firstImage;
 
  
  constructor(private auctionService: AuctionService,            
              private activatedRoute: ActivatedRoute,
              private webSocket: WebsocketService){ }
  
  
  ngOnInit(): void {     
    socket.on("test", (data) => {
      endtime = data;      
      console.log(endtime);
    })
    
    loop = setInterval(() =>{      
      this.updateCountdown(this.auctionId, endtime)
    }, 1000);  
    
    button = document.getElementById('bidButton');
    countdownEl = document.getElementById('countdown');
    biddingPrice = document.getElementById('newBid');
    original = document.getElementById('reaffirm');

    this.activatedRoute.params.subscribe(data =>{
      this.auctionId = data.id;  
      console.log(this.auctionId)  
     })
    
    this.auctionService.getAuctionById(this.auctionId).subscribe(data =>{
      this.auction = data;
      this.increment = data.product.increaseAmount;
      this.productName = data.product.name;
      this.productImages = data.product.productImages;
      this.imagesExceptFirst = this.productImages.slice(1);
      this.firstImage = this.productImages[0].link;
     
       

    })  

    this.auctionService.getRecordHavingBestPrice(this.auctionId).subscribe(data =>{
     
      if(this.currentBid == null) {this.currentBid = 0;}
      if(this.currentWinner == null) {this.currentWinner = "chưa có"}
     this.currentBid = data.bidPrice;     
     this.currentWinner = data.bidder.email;
     
    }); 


    this.newBid = new FormControl ('', [Validators.required, this.bidValidator, (control: AbstractControl) => {const price = control.value;
      return (price <= this.currentBid && price != ""||price%this.increment!=0&& price != "")? {invalidBid: true} : null; }]);

    this.auctionService.getTopAuctionRecords(this.auctionId).subscribe(data =>{     
        this.records = data;       
    })

  }  
  
  

  addAuctionRecord(): void{       
    this.replacePrice((<HTMLInputElement>biddingPrice).value);

    //  let bidder: User = {
    //     id: 2,
    //     fullname: "Nancy",
    //     email: 'nancy@gmail.com',
    //     phoneNumber: '01231112334',
    //     address: "abc",
    //     birthday: "1996-11-08",
    //     idCard: "123123123",
    //     gender: "Nữ",
    //     rate: {
    //         id: 1,
    //         name: "kim cương"
    //     },
    //     point: 120,
    //     lastLogin: "2020-08-13T00:00:00",
    //     status: true
    // };

    
      
    let auctionRecord: AuctionRecord = {

        auction: this.auction,
        bidder: {id: 1},
        bidTime: new Date(),
        bidPrice: this.newBid.value,
        isWinner: false
     }

     this.auctionService.saveNewAuctionRecord(auctionRecord).subscribe(data =>
      {
        this.auctionService.getTopAuctionRecords(this.auctionId).subscribe(data => this.records = data);

        this.auctionService.getRecordHavingBestPrice(this.auctionId).subscribe(data =>{
          this.currentBid = data.bidPrice;
          this.currentWinner = data.bidder.email;
          
         })
         ; 
      });     

 
    }

   
  replacePrice(userPrice){

    clearInterval(loop);
    clearInterval(loop1);

    var affirm = ("Yayy! Bạn đang là người thắng cuộc với giá "+ userPrice +"k");  

    
    loop1 = setInterval(() =>{
      this.updateCountdown(this.auctionId, 15)
      }, 1000);

    return original.innerText = affirm;
  };  
 

  updateCountdown(auctionId, time){      
    
    time = time - new Date().getTime();    
     
      let seconds : any = Math.floor( (time/1000) % 60 );
      let minutes : any = Math.floor( (time/1000/60) % 60 );
      let hours : any = Math.floor( (time/(1000*60*60)) % 24 );

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes: minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;       
    $("#countdown").html(`${hours} : ${minutes} : ${seconds}`);     
         
    time++;
    if (time == 0){
      $("#countdown").html('Kết thúc');       
        
        $('#finished').modal('show');
        $('#bidButton').prop('disabled', true);
        $('#newBid').prop('disabled', true);

        clearInterval(loop);
        clearInterval(loop1);     
      this.auctionService.getRecordHavingBestPrice(this.auctionId).subscribe(data =>{       
        // console.log(this.auction);
        this.finalRecord = data;        
        this.auction.closeTime = new Date().toISOString().substring(0, 19);
        // console.log(this.auction);
      if (this.finalRecord == null){
        this.auction.auctionStatus = {
          id: 4,
          name: 'đấu giá thất bại'
      }
      } else{
        this.finalRecord.isWinner = true;
        this.auction.auctionStatus = {
          id: 3,
          name: 'đấu giá thành công'
      }
        this.finalRecord.auction = this.auction;
     }  
     
     this.auctionService.editAuctionById(this.auctionId, this.auction).subscribe();
     this.auctionService.editRecordHavingBestPrice(this.auctionId, this.finalRecord).subscribe();

    });

  }
}       
  

bidValidator(control: AbstractControl){
    
    
  const price = control.value;  
  let check: boolean = false;
  if(isNaN(price) ||  price < 0){
    check = true;
  }    

  return check? {bidPrice: true} : null;   
  } 
 
}

