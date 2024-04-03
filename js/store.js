let allProducts = [
    {
      id: 1,
      title: "Album 1",
      price: 12.93,
      img: "./Images/Album 1.png",
      count: 1,
    },
    { id: 2, title: "Album 2", price: 21, img: "./Images/Album 2.png", count: 1 },
    { id: 3, title: "Album 3", price: 33, img: "./Images/Album 3.png", count: 1 },
    {
      id: 4,
      title: "./Album 4",
      price: 41.98,
      img: "./Images/Album 4.png",
      count: 1,
    },
    { id: 5, title: "Coffee", price: 98, img: "./Images/Album 3.png", count: 1 },
    { id: 6, title: "Shirt", price: 65.33, img: "./images/Shirt.png", count: 1 },
  ];
  
  let userBasket = [];
  
  const shopItemsContainer = document.querySelector(".shop-items");
  const basketProductsContainer = document.querySelector(".cart-items");
  const removeAllProductBtn = document.querySelector("#remove-all-product");
  const cartPriceElem = document.querySelector(".cart-total-price");
  
  allProducts.forEach(function (product) {
   
    shopItemsContainer.insertAdjacentHTML('beforeend','<div class="shop-item"><span class="shop-item-title">' +product.title +'</span><img class="shop-item-image" src="' +product.img+ ' "><div class="shop-item-details"><span class="shop-item-price"> ' +product.price+'</span><button class="btn btn-primary shop-item-button" onclick="addProductToBasket('+product.id+')" >ADD TO CART</button></div></div>')
  });
  
  function addProductToBasket(productId) {
    let mainProduct = allProducts.find(function (product) {
      return product.id === productId;
    });
  
    let basketProduct = userBasket.find(product => product.id === productId);
    if (basketProduct) {
      basketProduct.count++;
    } else {
      userBasket.push({ ...mainProduct, count: 1 });
    }
    updateBasket();
  }
  
  function updateBasket() {
    basketProductsContainer.innerHTML = "";
    userBasket.forEach(function (product) {
      let basketProductContainer = document.createElement("div");
      basketProductContainer.classList.add("cart-row");
  
      let basketProductDetailsContainer = document.createElement("div");
      basketProductDetailsContainer.className = "cart-item cart-column";
  
      let basketProductImg = document.createElement("img");
      basketProductImg.src = product.img;
      basketProductImg.width = 100;
      basketProductImg.height = 100;
      basketProductImg.classList.add("cart-item-image");
  
      let basketProductTitleSpan = document.createElement("span");
      basketProductTitleSpan.classList.add("cart-item-title");
      basketProductTitleSpan.textContent = product.title;
  
      basketProductDetailsContainer.append(basketProductImg, basketProductTitleSpan);
  
      let basketProductPriceSpan = document.createElement("span");
      basketProductPriceSpan.className = "cart-price cart-column";
      basketProductPriceSpan.textContent = product.price;
  
      let basketProductInputsContainer = document.createElement("div");
      basketProductInputsContainer.className = "cart-quantity cart-column";
  
      let basketProductInput = document.createElement("input");
      basketProductInput.className = "cart-quantity-input";
      basketProductInput.value = product.count;
      basketProductInput.setAttribute("type", "number");
      basketProductInput.addEventListener("change", function () {
        updateProductCount(product.id, basketProductInput.value);
      });
  
      let basketProductRemoveBtn = document.createElement("button");
      basketProductRemoveBtn.className = "btn btn-danger";
      basketProductRemoveBtn.textContent = "Remove";
      basketProductRemoveBtn.addEventListener("click", function () {
        removeProductFromBasket(product.id);
      });
      basketProductInputsContainer.append(basketProductInput, basketProductRemoveBtn);
  
      basketProductContainer.append(
        basketProductDetailsContainer,
        basketProductPriceSpan,
        basketProductInputsContainer
      );
  
      basketProductsContainer.append(basketProductContainer);

    });
  
    calcTotalPrice();
  }
  
  function removeProductFromBasket(productId) {
    userBasket = userBasket.filter(function (product) {
      return product.id !== productId;
    });
    updateBasket();
  }
  
  removeAllProductBtn.addEventListener("click", function () {
    userBasket = [];
    updateBasket();
  });
  
  function updateProductCount(productId, newCount) {
    let product = userBasket.find(product => product.id === productId);
    if (product) {
      product.count = newCount;
    }
    updateBasket();
  }
  
  function calcTotalPrice() {
    let totalPrice = userBasket.reduce((acc, product) => {
      return acc + (product.price * product.count);
    }, 0);
  
    cartPriceElem.textContent = "$" + totalPrice.toFixed(2);
  }
  