// get all item we need from html,
// this below line it for get query from html
const productContainer = document.querySelector(".products-item-container");
const cartIcon = document.querySelector(".cart-icon");
const listCartContainer = document.querySelector(".list-cart-container");
const cartCloseBtn = document.querySelector(".close-btn");
// end html query

// class
class Products {
  getProducts() {
    fetch("products.json")
      .then((result) => result.json())
      .then((res) => {
        UiProducts.initProduct(res.products);
      });
  }
}
class UiProducts {
  static initProduct(datas) {
    let item = "";
    datas.forEach((data) => {
      item += `<div class="product-item">
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
}

class localStorageProducts {}

// add event for domcontentload for init products
window.addEventListener("DOMContentLoaded", function () {
  let getDataProducts = new Products();
  getDataProducts.getProducts();
});

// js for simple cart
cartIcon.addEventListener("click", function () {
  listCartContainer.classList.add("active");
});

cartCloseBtn.addEventListener("click", function () {
  listCartContainer.classList.remove("active");
});
// end js for simple cart
