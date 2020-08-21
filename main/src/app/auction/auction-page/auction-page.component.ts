import { CartService } from './../../shared/services/cart.service';
import { TokenStorageService } from './../../auth/token-storage.service';
import { WebsocketService } from './../../websocket.service';
import { Component, OnInit} from '@angular/core';
import { FormControl, Validators, AbstractControl } from '@angular/forms';
import { AuctionService } from 'src/app/shared/services/auction.service';
import { ActivatedRoute } from '@angular/router';
import { AuctionRecord } from 'src/app/shared/models/auction-record';
import * as io from 'socket.io-client';
import { CartDetailDTO } from 'src/app/shared/models/dtos/cart-detail-dto';


// Creator: Hoai Ngan team C

//Khai báo socket để connect với server nodejs
const socket = io('http://localhost:3000');

//endDate của bảng product
let endtime;
//vòng lặp thời gian đầu tiên 
let loop;
//vòng lặp thời gian sau khi có người đấu giá (18s)
let loop1;

// để xuống dưới sử dụng được jquery
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
  // bước giá
  private increment;
  private currentWinner;
  private auctionId;
  private auction;
  private bidder;
  private productImages;
  private imagesExceptFirst;
  private firstImage;
 
  
  constructor(private auctionService: AuctionService,       
              private cartService: CartService,     
              private activatedRoute: ActivatedRoute, 
              private socket : WebsocketService,            
              private tokenStorageService: TokenStorageService){  
                
                // giải quyết web socket để đồng bộ giữa các client -_-

                // nhận về remaining time từ server nodejs (auction-server.js)
                this.socket.listen('remaining-time').subscribe(data =>{
                   clearInterval(loop); 
                   clearInterval(loop1);
                  console.log(data);
                  // if u wonder why i pass this.auctionId as a param 
                  // that's the temporary solutions for the prob which is 
                  // callback function of setInterval doesnt understand global variables hmmmm
                  // dunno why .... as also dunno how to say that in vietnamese srr
                  loop1 = setInterval(() =>{
                    this.updateCountdown(this.auctionId, data)
                    }, 1000);
            
                })  
                
                // nhận về bảng đấu giá, người thắng và giá đấu hiện tại từ server nodejs
                // gạch đỏ do lúc compile thì ide chưa hiểu thuộc tính gửi từ server về, runtime ok
                this.socket.listen('newData-from-server').subscribe(data => {
                  console.log(data);
                  this.currentBid = data.price;
                  this.currentWinner = data.winner;
                  this.records = data.records
                })

               }
  
  ngOnInit(): void {  

    // lấy auctionId từ url để dùng cho những service sau
    this.activatedRoute.params.subscribe(data => this.auctionId = data.id)

    // lấy về phiên đấu giá hiện tại    
    this.auctionService.getAuctionById(this.auctionId).subscribe(data =>{

      //thông tin phiên đấu giá để interpolation
      this.auction = data;
      this.increment = data.product.increaseAmount;
      this.productName = data.product.name;

      //xử lý ảnh cồng kềnh vì phải sử dụng slider của bootstrap :(
      this.productImages = data.product.productImages;
      this.imagesExceptFirst = this.productImages.slice(1);
      this.firstImage = this.productImages[0].link;

      //lấy về thời gian kết thúc ở backend và gọi vòng lặp để đếm ngược
      //Date.parse() để đổi ra milliseconds 
      endtime = data.product.endDate;      
      loop = setInterval(() =>{      
        this.updateCountdown(this.auctionId, Date.parse(endtime))
      }, 1000);  

    })  

    
    //xử lý ban đầu nếu chưa có người đấu giá
    this.auctionService.getRecordHavingBestPrice(this.auctionId).subscribe(data =>{     
      
      if(this.currentBid == null) {this.currentBid = 0;}
      if(this.currentWinner == null) {this.currentWinner = "đặt đi rồi có"}
      this.currentBid = data.bidPrice;     
      this.currentWinner = data.bidder.email;
     
    }); 


    // form control ô input nhập giá đấu và validate
    // phải viết custom validate trực tiếp vì ko biết sao viết hàm riêng thì lại ko hiểu this.currentBid  
    this.newBid = new FormControl ('', [Validators.required, this.positiveNumberValidator, (control: AbstractControl) => {
      const price = control.value;
      let check: boolean = false;
      if ((price <= this.currentBid && price != "")|| (price%this.increment!=0&& price != "")){
        check = true
      }
      return  check? {invalidBid: true} : null;
    }]);

    // lấy về bảng lịch sử phiên đấu giá
    this.auctionService.getTopAuctionRecords(this.auctionId).subscribe(data =>{     
        this.records = data;       
    })

  } 
  
  //thêm record mỗi lần client bấm đặt giá (nhập giá hợp lệ mới đc bấm)
    addAuctionRecord(): void{    
    this.replacePrice($("#newBid").val());   
    }
   
  replacePrice(newPrice){

    //xử lý bất đồng bộ của setInterval (giây nhảy thay phiên thay vì chờ setInterval kia hoàn thành)
    clearInterval(loop);
    clearInterval(loop1);

    //in thông báo cho client trên modal
    $("#reaffirm").html('Bạn đang là người thắng với giá '+newPrice+ 'k');


    //chuẩn bị đối tượng record để chuẩn bị lưu xuống db
    let auctionRecord: AuctionRecord = {

      auction: this.auction,
      // lấy userId từ token trong storage
      bidder: {id: this.tokenStorageService.getUser().userId},
      bidTime: new Date(),
      bidPrice: this.newBid.value,
      isWinner: false
   }

   //gửi thời gian mới về cho server node.js
   this.socket.emit('remaining', (new Date()).getTime() + 30000);

   //lưu record về db (tạm thời xử lý mỗi lần đấu giá là 1 record chứ k edit)
   this.auctionService.saveNewAuctionRecord(auctionRecord).subscribe(data =>
    {
      //đồng thời cập nhật lại bảng lịch sử đấu giá và các thông tin 
      this.auctionService.getTopAuctionRecords(this.auctionId).subscribe(data => {  

        this.records = data;
        this.currentBid = data[0].bidPrice;
        this.currentWinner = data[0].bidder.email;

        //cũng gửi đống thông tin mới về cho server node.js để đồng bộ giữa các client
        this.socket.emit('newData', {'price': data[0].bidPrice, 
                                   'winner': data[0].bidder.email,
                                   'records': data })
      });
    });   

    //kết thúc hàm xử lý đấu giá yehhh :(   
  };  
 
//hàm đếm ngược và xử lý kết thúc phiên đấu giá
  updateCountdown(auctionId, time){      
    
    //time trên tham số là milliseconds parse ra từ endDate trong bảng product
    //time này là remainingTime
    time = time - new Date().getTime();    
     
    // xử lý remainingTime
      let seconds : any = Math.floor( (time/1000) % 60 );
      let minutes : any = Math.floor( (time/1000/60) % 60 );
      let hours : any = Math.floor( (time/(1000*60*60)) % 24 );

    // chế biến để lúc số nhỏ hơn 10 thì có số 0 đằng trước cho đẹp :))
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes: minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;     

    
    //xử lý sau khi kết thúc đấu giá
    if (time == 0 || time < 0){

        $("#countdown").html('Kết thúc');
        $('#bidButton').prop('disabled', true);
        $('#newBid').prop('disabled', true);

        clearInterval(loop);
        clearInterval(loop1);   
        
      //lấy record người thắng để xử lý  
      this.auctionService.getRecordHavingBestPrice(this.auctionId).subscribe(data =>{  
        
        // thêm vào cart và hiện pop-up cho người thắng
        if(data.bidder.email === this.tokenStorageService.getUsername()){

          
          let productToCart : CartDetailDTO = {
            userId : this.tokenStorageService.getUser().userId,
            auctionId : this.auctionId,
            productWinPrice : data,
            closeTime: new Date().toISOString().substring(0, 19)            
        }        
          this.cartService.saveToCart(productToCart);
        
          $('#finished-success').modal('show');
        } else {
          // hiện pop-up thua cuộc
          $('#finished-failure').modal('show');
        }
        
      
        this.finalRecord = data;        
        //chuyển thành string để lưu db
        this.auction.closeTime = new Date().toISOString().substring(0, 19);

      // trường hợp ko có ai đấu giá   
      if (this.finalRecord == null){        
        this.auction.auctionStatus = {
          id: 4,
          name: 'đấu giá thất bại'
      }
      // trường hợp có người thắng
      } else{
        this.finalRecord.isWinner = true;
        this.auction.auctionStatus = {
          id: 3,
          name: 'đấu giá thành công'
      }
      //cập nhật lại auction của Record (thấy sai sai mà kệ)
        this.finalRecord.auction = this.auction;
     }  
     
     //edit lại phiên đấu giá và record của người thắng khi phiên đấu giá kết thúc
     this.auctionService.editAuctionById(this.auctionId, this.auction).subscribe();
     this.auctionService.editRecordHavingBestPrice(this.auctionId, this.finalRecord).subscribe();

    });

    function addToCart(){

      
      this.cartService.saveToCart()
  
    }

  } else {
    //nếu remainingTime lớn hơn 0 thì in ra trên màn hình
    $("#countdown").html(`${hours} : ${minutes} : ${seconds}`); 
  }  
}       
  
  //validate giá đấu phải là số dương
  positiveNumberValidator(control: AbstractControl){    
    
  const price = control.value;  
  let check: boolean = false;
  if(isNaN(price) ||  price < 0){
    check = true;
  }    

  return check? {bidPrice: true} : null;   
  } 

  


  //validate giá đấu phải lớn hơn giá hiện tại và là bội số của bước giá
  // bidPriceValidator(control: AbstractControl){

  // const price = control.value;
  //   let check: boolean = false;
  //   if (price <= this.currentBid && price != ""||price%this.increment!=0&& price != ""){
  //     check = true
  //   }
  //   return  check? {invalidBid: true} : null;
  // }

//  The End of Sorrow  :))))

}


