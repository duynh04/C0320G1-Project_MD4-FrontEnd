let lg = 0;
let fb = 0;

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

function logOut() {

  if (confirm("bạn có muốn đăng xuất !!!") == true) {
    lg = 0;
    document.getElementById("myForm").style.display = "none";
    alert("dăng xuất thành công !!");
    document.getElementById("print-text").innerHTML = "";
    document.getElementById('user').hidden = true;
  }
}


window.fbAsyncInit = function () {
  FB.init({
    xfbml: true,
    version: 'v8.0'
  });
};

(function (d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s);
  js.id = id;
  js.src = 'https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js';
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function loginFB() {
  document.getElementById('fb-root').style.display = 'block';
  document.getElementById("draggable").style.display = "none";
  document.getElementById("loginForm").style.display = "none";

}
