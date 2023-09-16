import HandCream from "../components/handcream.js"


let id = localStorage.getItem("userId") || 1;
let baseUrl = "https://telemedicineapi.onrender.com/";
let usersURL = `${baseUrl}user`;
let HandCreamUrl = `${baseUrl}handCream`;

let params = "";
let pageNumber = 1;
let curPage = 1;
let limit = 12;
let brand;
let wishList = (await getData(`${usersURL}`)).wishlist;
console.log(wishList);
let cart = (await getData(`${usersURL}`)).cart;
console.log(cart);


let mainCard = document.getElementById("card-list");
let productList = document.getElementById("card-list-wrapper");
let paginationWrapper = document.getElementById("pagination-wrapper");

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

fetchData(HandCreamUrl)
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

function check(wishList, name){
    let check = wishList.filter(data => {return (data.name == name)});
    let icon;
    if(check.length > 0){
        icon = `<i class="fa-solid fa-heart" style="color:red; font-weight:900"></i>`;
    }
    else
        icon = `<i class="fa-solid fa-heart"></i>`;
    return icon;
}

function displayData(data){
    mainCard.innerHTML = "";
    let r1 = create("div", "row");

    data.map((ele) => {
        let card = create("div", "card col-lg-4 col-md-6 col-sm-12 ", "", "");
        card.addEventListener("click", () => {
            localStorage.setItem("productDetails", ele.id);
            window.location.href = "productDetailspage.html";
        })

        let div1 = create("div", "div-row1", "", "");

        let temp = create("div", "icon", "", "");
        let icon = check(wishList, ele.name);
        temp.innerHTML = icon;
        console.log()
        temp.addEventListener("click", (event) => { 
            event.stopPropagation();
            if(icon == check(wishList, ele.name)){
                temp.innerHTML = "";
                icon = check(wishList, ele.name);
                temp.innerHTML = icon;
                addToWishlist(ele);
            }
            else{
                temp.innerHTML = "";
                icon = check(wishList, ele.name);
                temp.innerHTML = icon;
                deleteFromWishlist(ele);
            }
        });

        div1.append(temp);

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
        r1.append(card);
        mainCard.append(r1);
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

async function getData(url){
    let res;
    try {
        res = await fetch(`${url}/${id}`, {
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
        let res = await getData(usersURL);
        console.log(res);

        res.wishlist.push(data);
        //console.log(res);

        let obj = { wishlist : res.wishlist };
        let post = await fetch(`${usersURL}/${id}`, {
            method : "PATCH",
            headers : { "Content-type" : "application/json" },
            body : JSON.stringify(obj),
        })
        post = await post.json();
        console.log(post);
        wishList = (await getData(`${usersURL}`)).wishlist;
        
    } catch (e) {
        console.log(e);
    }
}

async function deleteFromWishlist(data){
    let parent = (await getData(`${usersURL}`)).wishlist;
    console.log(parent);
    let ans = parent.filter((ele) => { return ele.name != data.name });
    console.log(ans);

    let obj = { wishlist : ans};
    let post = await fetch(`${usersURL}/${id}`, {
        method : "PATCH",
        headers : { "Content-type" : "application/json" },
        body : JSON.stringify(obj),
    })
    post = await post.json();
    console.log(post);
    wishList = (await getData(`${usersURL}`)).wishlist;
}

async function addToCart(data){
    try {
        let res = await getData(usersURL);
        res.cart.push(data);
        console.log(res);

        let obj = { wishlist : res.wishlist };
        let post = await fetch(`${usersURL}/${id}`, {
            method : "PATCH",
            headers : { "Content-type" : "application/json" },
            body : JSON.stringify(obj),
        })
        post = await post.json();
        console.log(post);
        
    } catch (e) {
        console.log(e);
    }
}