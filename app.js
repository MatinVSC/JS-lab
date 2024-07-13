// dom nouds
const $ = document;
const body = $.querySelector(".body");
const header = $.querySelector('header')
const showBasket = $.querySelector(".showBasket");
const basketLength = $.querySelector(".basketLength");
const container = $.querySelector(".container");
const navigation = $.body.querySelector(".navigation");
const title = $.querySelector(".title-nav");
const lists = $.querySelector(".list-category");
const feedTitle = $.querySelector('.feedback');
const swiperList = $.querySelector('.swiper');
const menu = $.querySelector('.menu');
const mobileIcon = $.querySelector('.menu-icon');
const closeIcon = $.querySelector('.close')
const basketLengtMobile = $.querySelector('.basketLengtMobile');

let BASKET = [];
let newDATA;
let userDATA;

// API

fetch("https://fakestoreapi.com/products")
  .then((response) => response.json())
  .then((data) => {
    newDATA = data.map((count) => ({ ...count, quantity: 1 }));
    renderProducts(newDATA);
  });

fetch("https://randomuser.me/api/?results=5")
  .then((response) => response.json())
  .then((data) => {
    renderUserFeedback(data.results);
    userDATA = data.results;
  });

// rendering functions

function renderProducts(list) {
  let template = list
  .map((item) => {
      return `
            <div class="cart-list">
                <div class="cart-img">
                    <img src="${item.image}" />
                </div>
                    <h4>${item.title}</h4>
                <div class="cart-info">
                    <h4>${item.category}</h4>
                    <span>Rating : ${item.rating.rate}</span>
                    </svg>
                </div>
                <div class="cart-btn">
                ${
                  !BASKET.find((basketItem) => basketItem.id === item.id)
                    ? `<button class="add-btn" onclick="handelAddToBasket('${item.id}')">Add To Basket</button>`
                    : `<p class="add">Added To Basket</p>`
                }
                <span>$ ${item.price}<span>
                </div>
            </div> `;
    })
    .join("");

  template = `
     <section class="root">
          <section class="root-product">
        ${template}
          </section>
        </section>
    `;
  container.innerHTML = template;
  basketLength.textContent = `(${BASKET.length})`;
  basketLengtMobile.textContent = `(${BASKET.length})`;
  navigation.style.display = "";
  lists.style.display = "";

  $.querySelector('.add-btn').addEventListener('click', () =>{
    handleToast('success')
  })
  
};

function renderBasket(userBasket) {
  let template = `<section class="baskets">`;
  template += userBasket
    .map((item) => {
      return `
            <div class="Basket">
                <img class="basketImg" src="${item.image}" />
                <div class="Basket-title">
                <h4>${item.title}</h4>
                <span>${item.category}</span>
                </div>
                <input class="input-number" type="number" value="${item.quantity}" />
                <p>$ ${item.price}</p>
                <img onclick="removeBasket('${item.id}')" class="trash" src="./src/svg images/delete-10403.svg" />
            </div>
        `;
    })
    .join("");

  template += `</section>
            <div class="Basket-info">
                <button class="backHome" onclick="backToHome()" >Back To Home</button>
                <h5>Total Price : (<span class="price"></span>)<h5>
            </div> 
        `;

  container.innerHTML = template;
  basketLength.textContent = BASKET.length;
  basketLengtMobile.textContent = BASKET.length;
  title.textContent = "Basket";
  navigation.style.display = "none";
  lists.style.display = "none";
  feedTitle.style.display = "none";
  swiperList.style.display = "none";

  let inputBasket = $.querySelectorAll(".input-number");

  inputBasket.forEach((inputBasket, key) => {
    inputBasket.oninput = function () {
      updateProductQuantity(BASKET[key], inputBasket.value);
    };
  });

  $.querySelector('.trash').addEventListener('click', () =>{
    handleToast('remove')
  });

  setLocalStorage(BASKET);
};

function renderUserFeedback(list) {
  let template = list
    .map((user) => {
      return `
            <div class="swiper-slide">
                <div class="users">
                    <img class="user-img" src="${user.picture.large}" />
                    <span>${user.name.first}</span>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Dolorem ullam natus similique cumque facere voluptates perferendis et doloremque quaerat impedit!</p>
                </div>
            </div>
        `;
    })
    .join("");

  $.querySelector(".swiper-wrapper").innerHTML = template;
  swiper = new Swiper(".swiper", {
    direction: "horizontal",
    loop: true,
    autoplay: {
      delay: 2000,
    },
    pagination: {
      el: ".swiper-pagination",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    scrollbar: {
      el: ".swiper-scrollbar",
    },
  });
};

function renderLoginPage() {
  const template = `
    <section>
      <div id="loginContainer">
      <div class="inputcontainer">
      <input class="inputLoginName inputLogin" type="text" placeholder="enter your name" />
      </div>
      <div class="inputcontainer">
      <input class="inputLoginEmail inputLogin" type="text" placeholder="enter your email" />
      </div>
      <div class="inputcontainer">
      <input class="inputLoginNumber inputLogin" type="text" placeholder="enter your number" />
      </div>
      <div class="inputcontainer">
      <input class="inputLoginPassword inputLogin" type="text" placeholder="enter your password" />
      </div>
      <span id="error"><span>
      </div>
      <div>
      <button class="backHome" onclick="backToHome()" >Back To Home</button>
      </div>
    </section>
  `;

  container.innerHTML = template;
  navigation.style.display = "none";
  lists.style.display = "none";
  title.textContent = "Sign UP Page";
  feedTitle.style.display = "none";
  swiperList.style.display = "none";

  const inputLoginName = $.querySelector(".inputLoginName");
  const inputLoginEmail = $.querySelector(".inputLoginEmail");
  const inputLoginNumber = $.querySelector(".inputLoginNumber");
  const inputLoginPassword = $.querySelector(".inputLoginPassword");
  const errorSpan = $.querySelector("#error");

  function handelRegaxPattern(regax) {
    return (event) => {
      const input = event.target;
      const value = event.target.value;
      const isValid = regax.test(value);

      if (isValid) {
        errorSpan.textContent = "success";
        input.classList.remove("error");
        input.classList.add("success");
      } else {
        input.classList.add("error");
        errorSpan.textContent = "please enter correct valies !";
      }
    };
  };

  inputLoginNumber.addEventListener(
    "keyup",
    handelRegaxPattern(/^(\+989|0?9)\d{2}[- ]?(\d{3})[- ]?(\d{4})$/)
  );
  inputLoginName.addEventListener(
    "keyup",
    handelRegaxPattern(/^[a-zA-Z ]{5,}$/)
  );
  inputLoginEmail.addEventListener(
    "keyup",
    handelRegaxPattern(/^[a-z0-9_.]{3,}@[a-z0-9-]{1,}.[a-z]{2,}$/)
  );
  inputLoginPassword.addEventListener(
    "keyup",
    handelRegaxPattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)
  );
};

// handeler functions

function handelAddToBasket(productId) {
  const finded = newDATA.find((product) => product.id === +productId);
  BASKET.push(finded);
  renderProducts(newDATA);
};

function removeBasket(removeId) {
  BASKET = BASKET.filter((product) => product.id !== +removeId);
  basketLength.textContent = BASKET.length - 1;
  renderBasket(BASKET);
  calcTotalPrice(BASKET);
};

function updateProductQuantity(basket, counter) {
  basket.quantity = counter;
  console.log("product id: " + basket.id + " new count: " + counter);
  calcTotalPrice(BASKET);
};

let totalPriceValue = 0;

function calcTotalPrice(userPrice) {
  const totalPrice = $.querySelector(".price");
  totalPriceValue = 0;
  userPrice.map(
    (product) => (totalPriceValue += Math.floor(product.quantity * product.price))
  );
  totalPrice.innerHTML = totalPriceValue;
};

let userScroll = 0;

function handelScroll () {
  if ( window.scrollY > userScroll) {
      header.classList.remove('scroll');
  } else {
      header.classList.add('scroll')
  }

  userScroll = window.scrollY;
};

// filltered function

$.querySelector(".input-ser").addEventListener("keyup", function (event) {
  const value = event.target.value;
  const search = newDATA.filter((product) => product.title.search(value) - 1);
  renderProducts(search);
});

function filteredLowestPrice(list) {
  return list.filter((product) => product.price < 100);
};

function filteredHightPrice(list) {
  return list.filter((product) => product.price > 100);
};

function filteredDescPrice(list) {
  return list.filter((product) => product.price < 50);
};

function filteredAscePrice(list) {
  return list.filter((product) => product.price > 500);
};


// events

showBasket.addEventListener("click", () => {
  renderBasket(BASKET);
  calcTotalPrice(BASKET);
});

$.querySelector(".lowPrice").addEventListener("click", () => {
  const filtered = filteredLowestPrice(newDATA);
  renderProducts(filtered);
});

$.querySelector(".hightPrice").addEventListener("click", () => {
  const filtered = filteredHightPrice(newDATA);
  renderProducts(filtered);
});

$.querySelector(".descPrice").addEventListener("click", () => {
  const filtered = filteredDescPrice(newDATA);
  renderProducts(filtered);
});

$.querySelector(".ascePrice").addEventListener("click", () => {
  const filtered = filteredAscePrice(newDATA);
  renderProducts(filtered);
});

$.querySelector(".login").addEventListener("click", () => {
  renderLoginPage();
});

window.addEventListener("scroll", handelScroll);

function backToHome() {
  renderProducts(newDATA);
}

$.querySelector(".home").addEventListener("click", () => {
  renderProducts(newDATA);
});

// localStorage

function setLocalStorage (newProduct) {
  localStorage.setItem('product', JSON.stringify(newProduct));
};

function getLocalStorage () {
  let localStorageBasket = JSON.parse(localStorage.getItem('product'));

  if (localStorageBasket) {
    BASKET = localStorageBasket;
  } else {
    BASKET = [];
  }
};

window.addEventListener("load", getLocalStorage);



// mobile events

$.querySelector('.showBasketMobile').addEventListener("click", () => {
  renderBasket(BASKET);
  calcTotalPrice(BASKET);
});

let flag = false;

if (menu.style.display = "none") {
  mobileIcon.addEventListener('click', () =>{
    menu.style.display = "block";
    mobileIcon.style.display = "none";
    closeIcon.style.display = "block";
    flag = true;
  })
}
if (flag = true) {
  closeIcon.addEventListener('click', () =>{
    menu.style.display = "none";
    mobileIcon.style.display = "block";
    closeIcon.style.display = "none";
  })
}

const handleToast = (state) => {
  if ( state == 'success') {
    Toastify({
      text: 'added to cart',
      position: 'center',
      gravity: 'top',
      style: {
          background: 'green'
      },
      close: true
    }).showToast();
  } else {
    Toastify({
      text: 'removed from cart',
      position: 'center',
      gravity: 'top',
      style: {
          background: 'red'
      },
      close: true
    }).showToast();
  }
};