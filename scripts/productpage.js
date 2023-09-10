import HandCream from "../components/handcream.js"

console.log(HandCream);

let mainCard = document.getElementById("card-list");

function create(arg1, arg2, arg3, arg4){
    let card = document.createElement(arg1);
    card.className = arg2;
    if(arg4 != "")
        card.setAttribute(arg3, arg4);
    return card;
}
displayData(HandCream);
function displayData(data){
    mainCard.innerHTML = "";
    data.map((ele) => {
        let card = create("div", "card", "", "");

        let div1 = create("div", "div-row1", "", "");

        let temp = create("div", "icon", "", "");
        temp.innerHTML = `<i class="fa-regular fa-heart"></i>`;

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

        div4.append(btn);

        card.append(div1, div2, div3, div4);
        mainCard.append(card);
    })
}