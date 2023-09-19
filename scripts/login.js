//const baseURL = `${import.meta.env.baseServerAPI}`

// Navbar

import navbar from "./navbar.js";
let nav = document.getElementById("navbar");
nav.innerHTML = navbar();

// UPDATE CART NUMBER of PRODUCTS
function updateCartNumber(){
    const cartNumber = document.querySelector(".cart-number");
    //console.log(cartNumber);
    let cartCount = JSON.parse(localStorage.getItem("productDetails")) || 0;
    if(cartCount != 0)
        cartCount = cartCount.length;
    
    //console.log(cartCount)
    cartNumber.textContent = cartCount;
    if(cartCount > 0)
        cartNumber.classList.remove("hide");
    else
        cartNumber.classList.add("hide");
}
updateCartNumber();


// Signup Page

let userURL = `https://telemedicineapi.onrender.com/user`

let SignupFirstName = document.getElementById("SignupFirstName");
let SignupLastName = document.getElementById("SignupLastName");
let SignupEmail = document.getElementById("SignupEmail");
let SignupPassword = document.getElementById("SignupPassword");
let SignupeyeIcon = document.getElementById("SignupeyeIcon");
let SignupConfirmPassword = document.getElementById("SignupConfirmPassword");
let SignupConfirmeyeIcon = document.getElementById("SignupConfirmeyeIcon");
let createAccount = document.querySelector("#create-account-button");
let SignupInfo = document.getElementById("userCheck");


SignupeyeIcon.addEventListener("click", () => {
    togglePassword(SignupPassword, SignupeyeIcon);
});
SignupConfirmeyeIcon.addEventListener("click", () => {
    togglePassword(SignupConfirmPassword, SignupConfirmeyeIcon);
});
createAccount.addEventListener("click", () => { 
    SignupInfo.textContent = "";
    createUser();
});

function togglePassword(password, icon){
    if(password.type == "password"){
        password.type = "text";
        if(icon.id == "SignupeyeIcon"){
            SignupeyeIcon.classList.replace("fa-eye-slash", "fa-eye");
        }
        else if(icon.id == "SignupConfirmeyeIcon"){
            SignupConfirmeyeIcon.classList.replace("fa-eye-slash", "fa-eye");
        }
        else if(icon.id == "SignineyeIcon"){
            SignineyeIcon.classList.replace("fa-eye-slash", "fa-eye");
        }
            
    }
    else{
        password.type = "password";
        if(icon.id == "SignupeyeIcon"){
            SignupeyeIcon.classList.replace("fa-eye", "fa-eye-slash");
        }
        else if(icon.id == "SignupConfirmeyeIcon"){
            SignupConfirmeyeIcon.classList.replace("fa-eye", "fa-eye-slash");
        }
        else if(icon.id == "SignineyeIcon"){
            SignineyeIcon.classList.replace("fa-eye", "fa-eye-slash");
        }
    }
}

async function createUser(){
    let obj = {
        firstName : SignupFirstName.value,
        lastName : SignupLastName.value,
        userName : `${SignupFirstName.value} ${SignupLastName.value}`,
        email : SignupEmail.value,
        password : SignupPassword.value,
    }
    console.log(obj);

    if(SignupPassword.value.length >= 8){
        let data = await fetch(`${userURL}?email=${SignupEmail.value}`);
        data = await data.json();
        //console.log(data);
        if(data.length > 0){
            SignupInfo.textContent = "User Already Exists. Please Login";
            SignupInfo.style.color = "red"
        }
        else{
            let res = await fetch(userURL, {
                method : "POST",
                headers : { "Content-type" : "application/json"},
                body : JSON.stringify(obj),
            });
            res = await res.json();
            //console.log(res);
            SignupInfo.textContent = "Account Created Successfully. Please login to continue shopping.";
            SignupInfo.style.color = "green";
        }
    }
    else{
        SignupInfo.textContent = "Password must be atleast 8 characters long.";
        SignupInfo.style.color = "red";
    }
}


// Login Page



let SigninInfo = document.getElementById("info");

let SigninEmail = document.getElementById("SigninEmail");
let SigninPassword = document.getElementById("SigninPassword");
let SignineyeIcon = document.getElementById("SignineyeIcon");
let SigninButton = document.querySelector("#signin-button");


SigninButton.addEventListener("click", () => {
    SigninInfo.innerHTML = "";
    loginUser();
});
SignineyeIcon.addEventListener("click", () => {
    togglePassword(SigninPassword, SignineyeIcon);
});

async function loginUser(){
    //console.log(email.value, password.value);
    let data = await fetch(`${userURL}?email=${SigninEmail.value}&password=${SigninPassword.value}`);
    data = await data.json();
    //console.log(data);

    if(data.length > 0){
        localStorage.setItem("userName", data[0].firstName);
        localStorage.setItem("userID", data[0].id);
        openPopUpBar();
        // alert("Login Successful")
    }
    else{
        SigninInfo.textContent = `Your email and password does not match`;
        SigninInfo.style.color = "red";
    }
}

// Pop-up box

let body1 = document.getElementById("popup");
let sec = document.getElementById("seconds");
    
let closeBtn = document.getElementById("closeBtn");
closeBtn.addEventListener("click", closePopUpBar);

let timer;
function openPopUpBar(){
    body1.classList.add("open-popup");
    let temp = 5;
    setInterval(() => {
        sec.textContent = "";
        sec.textContent = --temp;
    }, 1000)
    timer = setTimeout(() => { window.location.href = "index.html" }, 5000);
}
function closePopUpBar(){
    body1.classList.remove("open-popup")
    clearTimeout(timer);
    window.location.href = "index.html";
}



