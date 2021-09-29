// make class for get data producs,ui,and display

// products class
class Products {
  getProducts() {
    fetch("products.json")
      .then((res) => res.json())
      .then((res) => {
        UiProducts.initProduct(res.products);
        localStorage.setItem("allProducts", JSON.stringify(res.products));
      });
  }
}

// class ui producst
class UiProducts {
  static initProduct(datas) {
    let item = ``;
    datas.forEach((data) => {
      item += `<div class="product-item" data-id=${data.id}>
      <div class="image-item">
        <img src=${data.image} alt="indomie" />
      </div>
      <div class="product-title">${data.title}</div>
      <div class="product-price">${data.price}</div>
      <div class="button-container">
        <button class="add-in-cart">add in cart</button>
      </div>      
  </div>`;
    });
    productContainer.innerHTML = item;
  }
  static cartProduct(product) {
    cartContainer.classList.add("active");
    let data = "";
    product.forEach((p) => {
      data += ` <div class="cart-item" data-product=${p.id}>
      <div class="image-list">
        <img src=${p.image} width="150px" alt="">
      </div>
      <div class="text-info-list">
        <p class="food-name">${p.title}</p>
        <p class="food-price">rp ${p.price}</p>
        <div class="remove-btn">
          <button>remove</button>
        </div>
      </div>
      <div div class="btn-add-item">
        <i class="fas fa-angle-up up-arrow"></i>
        <p class="sum">1</p>
        <i class="fas fa-angle-down down-arrow"></i>
      </div>
    </div>`;
    });
    cartItemProduct.innerHTML = data;
  }
}

// class display producst
class DisplayProducts {
  static getAllProductLocalStorage() {
    let data = localStorage.getItem("allProducts");
    return JSON.parse(data);
  }
  static setCartProduct(cartItem) {
    localStorage.setItem("cartProducts", JSON.stringify(cartItem));
    UiProducts.cartProduct(cartItem);
  }
  static getProduct() {
    return localStorage.getItem("cartProducts");
  }
}

// cart container
const cartItemProduct = document.querySelector(".cart-item-container");
// fisrt, get data product while content have been loaded

const productContainer = document.querySelector(".products-item-container");

const products = new Products();

products.getProducts();

// js for cart translate
const cartIcon = document.querySelector(".cart-icon");
const cartContainer = document.querySelector(".list-cart-container");
const btnCloseCart = document.querySelector(".close-btn");

btnCloseCart.addEventListener("click", function () {
  cartContainer.classList.remove("active");
});
cartIcon.addEventListener("click", function () {
  cartContainer.classList.add("active");
});

// check for init cart product
let cartItem = [];
if (DisplayProducts.getProduct()) {
  cartItem = JSON.parse(DisplayProducts.getProduct());
} else {
  cartItem = [];
}

// javascript for, add food to cart
window.addEventListener("click", function (e) {
  if (e.target.classList.contains("add-in-cart")) {
    e.target.innerHTML = "in cart";
    e.target.disabled = true;
    let productId = e.target.parentElement.parentElement.dataset.id;
    let products = DisplayProducts.getAllProductLocalStorage();
    let product = products.filter((item) => item.id == productId);
    cartItem = [...cartItem, ...product];
    //  set to local storage
    DisplayProducts.setCartProduct(cartItem);
    // change cart view
    UiProducts.cartProduct(cartItem);
  }
});

// add event to window when page finish to load
window.addEventListener("DOMContentLoaded", function () {
  UiProducts.cartProduct(cartItem);
});

const clearBtn = document.querySelector(".clear-all");
// add event to clear all
clearBtn.addEventListener("click", function () {
  let item = [];
  localStorage.setItem("cartProducts", item);
  UiProducts.cartProduct(item);
});
// javascript for remove each item in cart
cartItemProduct.addEventListener("click", function (e) {
  if (e.target.textContent == "remove") {
    let cartId = e.target.parentElement.parentElement.parentElement.dataset.product;
    let cartProducts = localStorage.getItem("cartProducts");
    cartProducts = JSON.parse(cartProducts);
    console.log(cartProducts);
    let newCart = cartProducts.filter((cart) => cart.id != cartId);
    localStorage.setItem("cartProducts", JSON.stringify(newCart));
    UiProducts.cartProduct(newCart);
  }
});
