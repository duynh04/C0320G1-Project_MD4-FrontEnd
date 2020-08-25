import { TokenStorageService } from './../auth/token-storage.service';
import { WebsocketService } from './../shared/services/websocket.service';
//creator: Nguyễn Xuân Hùng
import { Router } from '@angular/router';
import { Auction } from './../shared/models/auction';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuctionService } from '../shared/services/auction.service';
import * as io from 'socket.io-client';
import { CountdownConfig } from 'ngx-countdown';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

//Khai báo socket để connect với server nodejs
const socket = io('https://nancy-auction.herokuapp.com');

//endDate của bảng product
let endtime;
//vòng lặp thời gian đầu tiên
let loop;

// để xuống dưới sử dụng được jquery
declare var $: any;

//config lớn hơn 24h
const CountdownTimeUnits: Array<[string, number]> = [
  ['Y', 1000 * 60 * 60 * 24 * 365], // years
  ['M', 1000 * 60 * 60 * 24 * 30], // months
  ['D', 1000 * 60 * 60 * 24], // days
  ['H', 1000 * 60 * 60], // hours
  ['m', 1000 * 60], // minutes
  ['s', 1000], // seconds
  ['S', 1], // million seconds
];
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  auctionList: Auction[];
  auctions : Observable<Auction[]>
  auctionStatusId =2;
  message="";
  showSearch :boolean;
  productName :string="";
  price : string="";
  categoryName : string=""; 
  currentProductName :string="";
  currentPrice : string="";
  currentCategoryName : string="";
  email: string;
  endDateList: number[] = [];

  //paging
  currentPage: number;
  pageSize : number;
  totalElements : number;
  stt: number[];
  isEmpty : boolean = false;
  
  constructor(private auctionService: AuctionService,
    private router:Router,
    private webSocket: WebsocketService,
    private tokenStorage:TokenStorageService) { 
      //Nếu có đấu giá thành công thì refresh
      this.webSocket.listen('message-from-server').subscribe(data=>{
        this.ngOnInit();
      })
      if(tokenStorage.getJwtResponse()){
        this.email = tokenStorage.getJwtResponse().accountName;
      }
    }
  ngOnInit() {
    this.showSearch=false;
    this.message="";
    this.endDateList = [];
     this.auctionService.getAuctionsProductByAuctionId(this.auctionStatusId).subscribe(data=> {
       this.auctionList=data;
       for(var i=0;i<this.auctionList.length;i++){
         var endDate = this.auctionList[i].product.endDate;
         var time = (new Date(endDate).getTime() - new Date().getTime()) /1000;
         if(time<0){
           time=0;
         }
         this.endDateList.push(time);
       }
      }) 
  }

  //config nếu endDate lớn hơn 24h
  moreThan24Hours: CountdownConfig = {
    formatDate: ({ date, formatStr }) => {
      let duration = Number(date || 0);

      return CountdownTimeUnits.reduce((current, [name, unit]) => {
        if (current.indexOf(name) !== -1) {
          const v = Math.floor(duration / unit);
          duration -= v * unit;
          return current.replace(new RegExp(`${name}+`, 'g'), (match: string) => {
            return v.toString().padStart(match.length, '0');
          });
        }
        return current;
      }, formatStr);
    },
  };

  changeStatusAuction(value){
    if(value=="đang đấu giá"){
      this.auctionStatusId=2;
      this.ngOnInit();
    }else{
      this.auctionStatusId=3;
      this.ngOnInit();
    }
  }
  navigateToMyAuctionPage(){
    this.router.navigateByUrl("/auction/myAuction");
  }
  navigateToTopAuctionPage(){
    this.router.navigateByUrl("/auction/topAuction");
  }
  changeCategoryName(value){
    this.message="";
    if(value==""){
      this.ngOnInit();
    }else{
      this.auctionService.getAucionsListByAuctionIdAndCategoryName(2,value).subscribe(data=>{
        this.auctionList= data;
        if(this.auctionList.length==0){
          this.message="Hiện tại không có loại sản phẩm này đang đấu giá"
        }
        this.endDateList = [];
        for(var i=0;i<this.auctionList.length;i++){
          var endDate = this.auctionList[i].product.endDate;
          var time = (new Date(endDate).getTime() - new Date().getTime()) /1000;
          if(time<0){
            time=0;
          }
          this.endDateList.push(time);
        }
      }
        )
    }
  }


  search(){
    this.message="";
    this.productName=this.currentProductName;
    this.categoryName = this.currentCategoryName;
    this.price = this.currentPrice;
    this.auctionService.searchAuctionsAtHomePage(this.productName,this.currentPrice,this.categoryName).subscribe(data=>{
      this.auctionList = data;
      if(this.auctionList.length==0){
        this.message="Hiện tại không có sản phẩm này đang đấu giá cho tìm kiếm này";
      }
    });
  }
  
  
}
