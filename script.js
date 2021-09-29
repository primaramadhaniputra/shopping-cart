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
}

// class display producst
class DisplayProducts {
  static getAllProductLocalStorage() {
    let data = localStorage.getItem("allProducts");
    return JSON.parse(data);
  }
  static setCartProduct(cartItem) {
    localStorage.setItem("cartProducts", JSON.stringify(cartItem));
  }
}

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

// javascript for, add food to cart
let cartItem = [];
window.addEventListener("click", function (e) {
  if (e.target.classList.contains("add-in-cart")) {
    let productId = e.target.parentElement.parentElement.dataset.id;
    let products = DisplayProducts.getAllProductLocalStorage();
    let product = products.filter((item) => item.id == productId);
    cartItem = [...cartItem, ...product];
    //  set to local storage
    DisplayProducts.setCartProduct(cartItem);
  }
});
