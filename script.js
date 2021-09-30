// get all item we need from html,
// this below line it for get query from html
const productContainer = document.querySelector(".products-item-container");
const cartIcon = document.querySelector(".cart-icon");
const listCartContainer = document.querySelector(".list-cart-container");
const cartCloseBtn = document.querySelector(".close-btn");
const cartContainer = document.querySelector(".cart-item-container");
const totalPrice = document.querySelector(".total-price");
const clearBtn = document.querySelector(".clear-all");
console.log(clearBtn);
// end html query

// class
class Products {
  getProducts() {
    fetch("products.json")
      .then((result) => result.json())
      .then((res) => {
        UiProducts.initProduct(res.products);
        localStorageProducts.setProduct(res.products);
      });
  }
}
class UiProducts {
  static initProduct(datas) {
    let item = "";
    datas.forEach((data) => {
      item += `<div class="product-item" data-id=${data.id}>
      <div class="image-item">
        <img src=${data.image} alt="indomie" />
      </div>
      <div class="product-title">${data.title}</div>
      <div class="product-price">rp ${data.price}</div>
      <div class="button-container">
        <button class="add-in-cart">add in cart</button>
      </div>      
  </div>`;
    });
    productContainer.innerHTML = item;
  }
  static cartItem(item) {
    let product = ``;
    let total = 0;
    item.forEach((res) => {
      product += `<div class="cart-item">
      <div class="image-list">
        <img src=${res.image} width="150px" alt="">
      </div>
      <div class="text-info-list">
        <p class="food-name">${res.title}</p>
        <p class="food-price">$${res.price}</p>
        <div class="remove-btn">
          <button data-id=${res.id}>remove</button>
        </div>
      </div>
      <div div class="btn-add-item">
        <i class="fas fa-angle-up up-arrow"></i>
        <p class="sum">1</p>
        <i class="fas fa-angle-down down-arrow"></i>
      </div>
    </div>`;
      total += res.price;
    });
    totalPrice.innerHTML = total;
    cartContainer.innerHTML = product;
  }
}

class localStorageProducts {
  static setProduct(products) {
    localStorage.setItem("allProduct", JSON.stringify(products));
  }
  static getProducts() {
    return localStorage.getItem("allProduct");
  }
  static setCartProducts(data) {
    localStorage.setItem("cartProducts", JSON.stringify(data));
  }
  static getCartProducts() {
    return localStorage.getItem("cartProducts");
  }
}
let cartProduct = [];
// add event for domcontentload for init products
window.addEventListener("DOMContentLoaded", function () {
  // this for products
  let getDataProducts = new Products();
  getDataProducts.getProducts();

  // this is for initial cart Product
  let cartProducts = JSON.parse(localStorageProducts.getCartProducts());
  if (cartProducts.length > 0) {
    cartProduct = [...cartProducts];
    UiProducts.cartItem(cartProduct);
  }
});
// javascript for add each item to cart while cost click the button add in cart
// this event for add btn while  is clicked
productContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("add-in-cart")) {
    let productId = e.target.parentElement.parentElement.dataset.id;
    let products = JSON.parse(localStorageProducts.getProducts());
    let cartProducts = products.filter((item) => item.id == productId);
    cartProduct = [...cartProducts, ...cartProduct];
    // set for ui
    UiProducts.cartItem(cartProduct);
    listCartContainer.classList.add("active");
    // set for local storage
    localStorageProducts.setCartProducts(cartProduct);
  }
});

// js for remove button in cart product
cartContainer.addEventListener("click", (e) => {
  if (e.target.textContent == "remove") {
    let removeBtnId = e.target.dataset.id;
    let cartProducts = JSON.parse(localStorageProducts.getCartProducts());
    let newCartProducts = cartProducts.filter((product) => product.id != removeBtnId);

    // then set the cart local storage
    localStorageProducts.setCartProducts(newCartProducts);
    UiProducts.cartItem(newCartProducts);
    cartProduct = [...newCartProducts];
  }
});

// javascript for remove all
clearBtn.addEventListener("click", function () {
  cartProduct = [];
  localStorageProducts.setCartProducts(cartProduct);
  UiProducts.cartItem(cartProduct);
});
// js for simple cart
cartIcon.addEventListener("click", function () {
  listCartContainer.classList.add("active");
});

cartCloseBtn.addEventListener("click", function () {
  listCartContainer.classList.remove("active");
});
// end js for simple cart
