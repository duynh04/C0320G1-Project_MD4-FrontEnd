let lg = 0;
function loginForm() {
  let b = document.getElementById("loginForm").style.display;
  if (b == "none") {
    document.getElementById("loginForm").style.display = "block";
  } else {
    document.getElementById("loginForm").style.display = "none";
  }
}


function openForm() {
  let a = document.getElementById("myForm").style.display;
  if (a == "none") {
    document.getElementById("myForm").style.display = "block";
  } else {
    document.getElementById("myForm").style.display = "none";
  }
}

function login() {
  lg += 1;
  console.log(lg);
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("myForm").style.display = "block";
}

function openButton() {
  if (lg == 0) {
    loginForm();
  } else {
    openForm();
  }
  console.log(lg)
}


function sender() {

  document.getElementById("myForm").style.display = "block";
  let a = document.getElementById("content-text") ;
  document.getElementById("print-text").innerHTML = a.value ;
  document.getElementById('user').hidden=false;
  console.log(a.value)
  a.value = ""

}

function logOut() {

  if(confirm("bạn có muốn đăng xuất !!!")==true) {
    lg = 0 ;
    document.getElementById("myForm").style.display = "none";
    alert("dăng xuất thành công !!")
    document.getElementById("print-text").innerHTML = "" ;
    document.getElementById('user').hidden=true;
  }
}
