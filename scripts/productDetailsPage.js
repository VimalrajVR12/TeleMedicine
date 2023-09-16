
import HandCream from "../components/handcream.js"
console.log(HandCream);

let dataId = localStorage.getItem("productDetails");
console.log(dataId);
let data = HandCream.filter((ele) => {return (ele.id == dataId)})[0];
console.log(data);



let secondRow = document.querySelector(".second_row");
let thirdRow = document.querySelector(".third_row");
displayData(data);

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


// Zoom Image Functionalities

$(document).ready(function() {
  $('.zoom').magnify();
});

