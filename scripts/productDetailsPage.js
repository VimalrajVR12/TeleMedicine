// navbar
import navbar from "./navbar.js"
let nav = document.getElementById("navbar");
nav.innerHTML = navbar();

let user = localStorage.getItem("userName") || null;

// if(user == null)
//     userName.textContent = "Login In";
// else
//     userName.textContent = user

// NAVBAR Ends

// Footer Starts

import footer from "./footer.js";
let footers = document.getElementById("footer_import");
footers.innerHTML = footer();

// Footer ENDS


// Product Details Start

let baseUrl = "https://telemedicineapi.onrender.com/";
let usersURL = `${baseUrl}user`;
let HandCreamUrl = `${baseUrl}handCream`;
let id = localStorage.getItem("userId") || 1;
let cart1 = (await getData(`${baseUrl}cart`));
updateCartNumber();

let secondRow = document.querySelector("#mainContent .second_row");
let thirdRow = document.querySelector("#mainContent .third_row");

let dataId = localStorage.getItem("productId");
//console.log(dataId);
fetchProduct(dataId);
async function fetchProduct(id){
    try {
        let data = await fetch(`${HandCreamUrl}/${dataId}`);
        data = await data.json();
        //console.log(data);
        displayData(data);
    } catch (e) {
        console.log(e);
    }
}
//console.log(data);


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

function create(arg1, arg2, arg3="", arg4=""){
    let card = document.createElement(arg1);
    if(arg2 != "")
        card.className = arg2;
    if(arg4 != "")
        card.setAttribute(arg3, arg4);
    return card;
}

function displayData(data){
    let main = create("div", "container");

    let image = create("div", "image");

    let img = create("img", "zoom", "src", data.image);
    img.setAttribute("data-magnify-src", data.image)
    img.setAttribute("alt", data.name);
    img.setAttribute("id", "image");
    img.style.width = "200px";
    img.style.height = "250px";

    image.append(img);

    let body = create("div", "body");

    let lens = create("div", "", "id", "zoom_image");

    let name = create("h1", "");
    name.textContent = data.name;

    let btn = create("button", "");
    btn.textContent = "Add to Cart";
    btn.style.backgroundColor = "#00525d";
    btn.style.color = "white";
    btn.addEventListener("click", () => { addToCart(data); })

    let wt = create("p", "");
    wt.textContent = data.weight;

    let sub_div = create("div", "price");

    let MRP = create("p", "");
    if(data.MRP)
        MRP.textContent = `₹${data.MRP}`;

    let price = create("h5", "");
    price.textContent = `₹${data.price}`;

    sub_div.append(MRP, price);

    body.append( name, btn, wt, sub_div);
    main.append(image, body);

    let hr = create("hr", "");

    secondRow.append(main, hr);

    let main1 = create("div", "container");

    let h3 = create("h3", "");
    h3.textContent = `Description`;

    let p = create("p", "");
    p.textContent = data.description;

    let span = create("span", "");
    span.textContent = `The product image(s) shown are for representation purposes only. The actual product may vary. It
    is recommended to read the product labels (if any), batch details, directions for use, etc., as
    contained in the actual product before consuming and/or utilizing the product. The product is
    meant for fresh and immediate consumption, or as specified by the seller of the product. For
    other information, please contact the merchant directly.`

    main1.append(h3, p, span);
    thirdRow.append(main1);
}

async function getData(url, query=""){
    let res;
    try {
        res = await fetch(`${url}?userId=${id}&${query}`, {
            method : "GET",
            headers : { "Content-type" : "application/json" }
        })
        res = await res.json();
        //console.log(res);
        return res;
    } catch (e) {
        console.log(e)
    }
}

async function addToCart(data){
    try {
        // let res = await getData(`${baseUrl}cart`, `name=${data.name}`);
        // console.log(res);

        // if(res.length > 0){
        //     let obj = { quantity : res[0].quantity + 1 };
        //     let post = await fetch(`${baseUrl}cart/${res[0].id}`, {
        //         method : "PATCH",
        //         headers : { "Content-type" : "application/json" },
        //         body : JSON.stringify(obj),
        //     })
        //     post = await post.json();
        //     console.log(post);
        // }
        // else{
        //     let obj = { ...data, quantity : 1, userId : `${id}` };
        //     console.log(obj);
        //     let post = await fetch(`${baseUrl}cart`, {
        //         method : "POST",
        //         headers : { "Content-type" : "application/json" },
        //         body : JSON.stringify(obj),
        //     })
        //     post = await post.json();
        //     console.log(post);
        // }
        // cart1 = (await getData(`${baseUrl}cart`))
        let temp = JSON.parse(localStorage.getItem("productDetails")) || [];
        temp.push(data);
        //console.log(temp);
        localStorage.setItem("productDetails", JSON.stringify(temp));
        updateCartNumber();
    } catch (e) {
        console.log(e);
    }
}


// Zoom Image Functionalities

$(document).ready(function() {
    console.log("Zoom");
  $('.zoom').magnify();
});

