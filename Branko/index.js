let data = JSON.parse(products);

const listContainer = document.querySelector(".cards");

printCards = () => {
    listContainer.innerHTML = "";
    data.forEach((arr) => {
        listContainer.innerHTML += `<div class="product col-12 col-md-6 col-lg-4 text-center fw-bold">
    <p class ="product-title h3 m-3">${arr.name}</p>
    <img class ="product-image" src="${arr.image}" width="200"  height="200">
    <div class="product-details" >
        <p class="product-price h4 m-3">${arr.price} €</p>
        <button class="btn btn-primary product-button"  type="button">ADD  TO CART</button>
    </div>
    </div>
    `

    });

};

printCards();




var cart = [];

function addcart(product) {
    if (cart.find((val) => product.name === val.name)) {
        product.qtty++;
    } else {
        cart.push(product);
    }
    createRows();
    total();


}

let addbtn = document.querySelectorAll(".product-button")

for (let i = 0; i < addbtn.length; i++) {
    addbtn[i].addEventListener("click", function() {
        addcart(data[i]);
    });
};

const printRows = document.getElementById("cart-items");
createRows = () => {
    printRows.innerHTML = "";
    cart.forEach((val) => {
        printRows.innerHTML += `<div class="cart-row row d-flex">
    <div class="cart-item col-6 my-3 ">
    <img class="cart-item-image" src="${val.image}" width="100" height="100">
    <span class="cart-item-title h5 ">${val.name}</span>
    </div>
    <span class="cart-price col-3 h4 my-3">${val.price} €</span>
    <div class="cart-qtty-action col-3 d-flex">            
    <i class="minus fa fa-minus-circle my-auto" ></i>            
     <div class="cart-quantity p-4 h4">${val.qtty}</div>            
     <i class="plus fa fa-plus-circle my-auto"></i>        
    <button class="del btn btn-danger rounded-circle  my-auto ms-3 fw-bold" type="button"> X </button>            
    </div>
    </div>
    `
    });
    let plus = document.getElementsByClassName("plus");
    let minus = document.getElementsByClassName("minus");
    let del = document.getElementsByClassName("del");

    for (let i = 0; i < plus.length; i++) {
        plus[i].addEventListener("click", function() {
            plusQtty(i);
            total();
        })

        minus[i].addEventListener("click", function() {
            minusQtty(i);
            total();
        })

        del[i].addEventListener("click", function() {
            delQtty(i);
            total();
        })

    }

    totalitem();
};




delQtty = (index) => {
    cart[index].qtty = 1;
    cart.splice(index, 1);
    createRows();
}
minusQtty = (index) => {
    if (cart[index].qtty == 1) {
        cart.splice(index, 1);
        createRows();
    } else {
        cart[index].qtty--;
        document.getElementsByClassName("cart-quantity")[index].innerHTML = cart[index].qtty;
    }
}



plusQtty = (index) => {
    cart[index].qtty++;
    document.getElementsByClassName("cart-quantity")[index].innerHTML = cart[index].qtty;
}

total = () => {
    let total = 0;
    for (let val of cart)

        total = total + (val.price * val.qtty);
    document.getElementById("price").innerHTML = total.toFixed(2) + "€";
}
if (total > 10000) {
    discount = total * 0.25;
    document.getElementById("discount").innerHTML = discount.toFixed(2) + "€";
}
if (total > 7500) {
    discount = total * 0.1;
    document.getElementById("discount").innerHTML = discount.toFixed(2) + "€";

    let totalprice = total - discount;
    document.getElementById("dprice").innerHTML = totalprice + "€"
}




}


totalitem = () => {
    let totalitem = 0;
    for (let val of cart) {
        totalitem = +val.qtty;
    }
    document.getElementById("total-item").innerHTML = totalitem;
}