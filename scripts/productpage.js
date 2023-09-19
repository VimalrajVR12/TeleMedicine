// navbar
import navbar from "./navbar.js"
let nav = document.getElementById("navbar");
nav.innerHTML = navbar();



// NAVBAR Ends

// Footer Starts

import footer from "./footer.js";
let footers = document.getElementById("footer_import");
footers.innerHTML = footer();

// Footer ENDS



let baseUrl = "https://telemedicineapi.onrender.com/";
let usersURL = `${baseUrl}user`;
let HandCreamUrl = `${baseUrl}HandCream`;
let id = localStorage.getItem("userId") || 1;

let params = "";
let pageNumber = 1;
let curPage = 1;
let limit = 12;
let brand;
let wishList = (await getData(`${baseUrl}wishlist`))
//console.log(wishList);
// let cart1 = (await getData(`${baseUrl}cart`))
// console.log(cart1);
fetchData(HandCreamUrl)

let mainCard = document.getElementById("card-list");
let productList = document.getElementById("card-list-wrapper");
let paginationWrapper = document.getElementById("pagination-wrapper");
let search = document.getElementById("searchbar");
let timer;

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

// Search Function
search.addEventListener("input", () => {
    //console.log(search.value);
    clearTimeout(timer);
    params = `q=${search.value}`;
    timer = setTimeout(() => { fetchData(`${HandCreamUrl}`) }, 1000)
})

// Sorting by Price
let HightoLow = document.getElementById("priceDecs").addEventListener("click", ()=>{
    params = `_sort=price&_order=desc`;
    fetchData(HandCreamUrl);
});
let LowtoHigh = document.getElementById("priceAsc").addEventListener("click", ()=>{
    params = `_sort=price&_order=asc`;
    fetchData(HandCreamUrl);
})

// Sorting by Ratings
let High_Low = document.getElementById("ratingDesc").addEventListener("click", ()=>{
    params = `_sort=ratings&_order=desc`;
    fetchData(HandCreamUrl);
});
let Low_High = document.getElementById("ratingAsc").addEventListener("click", ()=>{
    params = `_sort=ratings&_order=asc`;
    fetchData(HandCreamUrl);
})

// Filter by Brands
let brand1 = document.getElementById("brand-1").addEventListener("click", (event) => { 
    selectBrand(event.target); 
})
let brand2 = document.getElementById("brand-2").addEventListener("click", (event) => { 
    selectBrand(event.target); 
})
let brand3 = document.getElementById("brand-3").addEventListener("click", (event) => { 
    selectBrand(event.target); 
})

function create(arg1, arg2, arg3="", arg4=""){
    let card = document.createElement(arg1);
    card.className = arg2;
    if(arg4 != "")
        card.setAttribute(arg3, arg4);
    return card;
}

async function fetchData(url, pageNumber = 1){
  try {
      let data = await fetch(`${url}?${params}&_page=${pageNumber}&_limit=${limit}`);
      data = await data.json();
      //console.log(data);
      branding(url);
      displayData(data);
      pagination(url);
  } catch (e) {
      console.log(e);
  }
}

function check1(name){
    let check = wishList.filter((ele) => { return (ele.name == name) });
    //console.log(check, name, check.length > 0);
    if(check.length > 0)
        return true;
    else
        return false;
}

function displayData(data){
    mainCard.innerHTML = "";
    productList.innerHTML = "";
    // let r1 = create("div", "row");

    data.map((ele) => {
        let card = create("div", "card", "", "");
        card.addEventListener("click", () => {
            localStorage.setItem("productId", ele.id);
            window.location.href = "productDetailspage.html";
        })

        let div1 = create("div", "div-row1", "", "");

        let ratings = create("div", "", "id", "ratings");
        ratings.textContent = `${ele.ratings}`
        ratings.style.display = "flex";
        
        let star = create("p", "");
        star.innerHTML = `<i class="fa-solid fa-star" style="color: orange;"></i>`;

        ratings.append(star);

        let temp = create("div", "icon", "", "");
        if(check1(ele.name))
            temp.innerHTML = `<i class="fa-solid fa-heart" style="color:red; font-weight:900"></i>`;
        else
            temp.innerHTML = `<i class="fa-solid fa-heart"></i>`;
        temp.addEventListener("click", (event) => { 
            event.stopPropagation();
            if(check1(ele.name)){
                temp.innerHTML = `<i class="fa-solid fa-heart"></i>`;
                deleteFromWishlist(ele);
            }
            else{
                temp.innerHTML = `<i class="fa-solid fa-heart" style="color:red; font-weight:900"></i>`;
                addToWishlist(ele);
            }
        });
        if(ele.ratings){
            div1.append(ratings, temp);
        }
        else{
            temp.style.textAlign = "right"
            div1.append(temp);
        }

        let div2 = create("div", "div-row2", "", "");

        let image = create("img", "image", "src", ele.image);
        image.setAttribute("alt", ele.name);

        div2.append(image);

        let div3 = create("div", "div-row3", "", "");

        let name = create("div", "product_name", "", "");
        name.textContent = ele.name.slice(0, 25) + "...";

        let innerBox = create("div", "price_div", "", "");

        let p1 = create("p", "MRP", "", "");
        p1.textContent = `₹${ele.MRP}`;

        let p2 = create("p", "price", "", "");
        p2.textContent = `₹${ele.price}`;

        if(ele.MRP)
            innerBox.append(p1);
        innerBox.append(p2);
        div3.append(name, innerBox);

        let div4 = create("div", "div-row4", "", "")

        let btn = create("button", "addToCart", "", "");
        btn.textContent = "Add to Cart"
        btn.addEventListener("click", (event) => { 
            event.stopPropagation();
            addToCart(ele) 
        });

        div4.append(btn);

        card.append(div1, div2, div3, div4);
        productList.append(card)
        mainCard.append(productList);
    })

}

async function pagination(url){
    try {
        let data = await fetch(`${url}?${params}`);
        data = await data.json();
        //console.log(data);
        let size = Math.ceil(data.length/limit);
        // console.log(size);

        paginationWrapper.innerHTML = "";
        for(let i=1; i<=size; i++){
            let btn = create("button", "buttons");
            btn.textContent = i;
            if(i == curPage){
                btn.disabled = true;
                btn.style.backgroundColor = "transparent"
            }
            else{
                btn.disabled = false;
                btn.style.backgroundColor = "whitesmoke";
                btn.style.boxShadow = "rgba(3, 102, 214, 0.3) 0px 0px 0px 3px";
            }
            // console.log(btn);
            btn.addEventListener("click", () => { 
                curPage = i;
                fetchData(url, i); 
            });
            paginationWrapper.append(btn);
        }
        mainCard.append(paginationWrapper);
    } catch (e) {
        console.log(e);
    }
}

async function branding(url){
    try {
        let data = await fetch(`${url}`);
        data = await data.json();
        //console.log(data);
        brand = data.map((ele) => {
            return ele.brand;
        })
        brands(brand);
    } catch (e) {
        console.log(e);
    }
}

function brands(data){
    document.getElementById("brand-1").textContent = data[0];
    document.getElementById("brand-2").textContent = data[1];
    document.getElementById("brand-3").textContent = data[2];
}

function selectBrand(ele){
    let text = ele.textContent;
    params = `brand=${text}`;
    fetchData(HandCreamUrl);
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

async function addToWishlist(data){
    try {
        let obj = { ...data, userId : `${id}` };
        let post = await fetch(`${baseUrl}wishlist`, {
            method : "POST",
            headers : { "Content-type" : "application/json" },
            body : JSON.stringify(obj),
        })
        post = await post.json();
        //console.log(post);
        wishList = (await getData(`${baseUrl}wishlist`));
        
    } catch (e) {
        console.log(e);
    }
}

async function deleteFromWishlist(data){

    let data1 = await getData(`${baseUrl}wishlist`, `name=${data.name}`);
    data1 = data1[0];
    //console.log(data1);
    let post = await fetch(`${baseUrl}wishlist/${data1.id}`, {
        method : "DELETE",
        headers : { "Content-type" : "application/json" },
    })
    post = await post.json();
    //console.log(post);
    wishList = (await getData(`${baseUrl}wishlist`)).data;
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
        // localStorage.setItem("productDetails", JSON.stringify(cart1));
        let temp = JSON.parse(localStorage.getItem("productDetails")) || [];
        temp.push(data);
        //console.log(temp);
        localStorage.setItem("productDetails", JSON.stringify(temp));
        updateCartNumber();
    } catch (e) {
        console.log(e);
    }
}