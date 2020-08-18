// const startingHour = 0;
// const startingMin = 1;
// let time = ((startingHour*60) + startingMin) * 60;
// let loop = setInterval(updateCountdown, 1000);
// let loop1;
// const countdownEl = document.getElementById('countdown');
//
// let newBid = document.getElementById('newBid');
// let original = document.getElementById('reaffirm');
// let button = document.getElementById('bidButton');
// let currentBid = document.getElementById('currentBid');
//
// button.onclick = () => replacePrice(newBid.value);


$('#change').click(function(){

  $('.select-cities').show();

});

$(document).ready(function() {
  $("#toggle").click(function() {
    $("#panel").slideToggle("slow");
  });
});

// var replacePrice = function(userPrice){
//
//   clearInterval(loop);
//   clearInterval(loop1);
//
//
//   var affirm = ("Yayy! Bạn đang là người thắng cuộc với giá "+ userPrice +"k");
//   currentBid.innerText = (userPrice + "k");
//
//   time = 15;
//   loop1 = setInterval(updateCountdown, 1000);
//
//
//
//   return original.innerText = affirm;
// };
//
//
//
// function updateCountdown(){
//   let hours = startingHour;
//   let minutes = Math.floor(time/60);
//   let seconds = time % 60;
//
//   hours = hours < 10 ? '0' + hours : hours;
//   minutes = minutes < 10 ? '0' + minutes: minutes;
//   seconds = seconds < 10 ? '0' + seconds : seconds;
//
//   console.log(minutes);
//
//   countdownEl.innerHTML = `${hours} : ${minutes} : ${seconds}`;
//   time--;
//
//   if (time == 0){
//     countdownEl.innerHTML = 'Kết thúc';
//
//     $('#cong').modal('show');
//
//     $('#bidButton').prop('disabled', true);
//
//     clearInterval(loop);
//     clearInterval(loop1);
//
//
//   }
//
// }

