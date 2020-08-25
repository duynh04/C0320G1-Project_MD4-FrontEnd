import { TokenStorageService } from './../auth/token-storage.service';
import { WebsocketService } from './../shared/services/websocket.service';
//creator: Nguyễn Xuân Hùng
import { Router } from '@angular/router';
import { Auction } from './../shared/models/auction';
import { Component, OnInit } from '@angular/core';
import { AuctionService } from '../shared/services/auction.service';
import * as io from 'socket.io-client';

//Khai báo socket để connect với server nodejs
const socket = io('https://nancy-auction.herokuapp.com');

//endDate của bảng product
let endtime;
//vòng lặp thời gian đầu tiên
let loop;

// để xuống dưới sử dụng được jquery
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  auctionList: Auction[];
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
  endDateList: string[];
  auctionId: any;
  constructor(private auctionService: AuctionService,
    private router:Router,
    private webSocket: WebsocketService,
    private tokenStorage:TokenStorageService) { 
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
     this.auctionService.getAuctionsProductByAuctionId(this.auctionStatusId).subscribe(data=> {
       this.auctionList=data;
      })
     // lấy về phiên đấu giá hiện tại
    this.auctionService.getAuctionById(this.auctionId).subscribe(data => {

      //lấy về thời gian kết thúc ở backend và gọi vòng lặp để đếm ngược
      //Date.parse() để đổi ra milliseconds
      endtime = data.product.endDate;
      loop = setInterval(() => {
        this.updateCountdown(Date.parse(endtime));
      }, 1000);

    });
  }
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
      }
        )
    }
  }

  showSearchForm(){
    if(this.showSearch){
      this.showSearch=false;
    }else{
      this.showSearch=true;
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
  //hàm đếm ngược và xử lý kết thúc phiên đấu giá
  updateCountdown(time) {

    //time trên tham số là milliseconds parse ra từ endDate trong bảng product
    //time này là remainingTime
    time = time - new Date().getTime();

    // xử lý remainingTime
    let seconds: any = Math.floor((time / 1000) % 60);
    let minutes: any = Math.floor((time / 1000 / 60) % 60);
    let hours: any = Math.floor((time / (1000 * 60 * 60)) % 24);

    // chế biến để lúc số nhỏ hơn 10 thì có số 0 đằng trước cho đẹp :))
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    
    //xử lý sau khi kết thúc đấu giá
    if (time == 0 || time < 0) {

      // console.log(time);
      $('#countdown').html('Sắp kết thúc');
    }else{
      //nếu remainingTime lớn hơn 0 thì in ra trên màn hình đếm ngược
    $('#countdown').html(`${hours} : ${minutes} : ${seconds}`);
    }
    
  }
}
