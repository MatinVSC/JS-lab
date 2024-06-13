// dom nodes
const $ = document;
let root = $.querySelector("#root");
let basket = $.querySelector("#basket");
let input = $.querySelector(".search");
let showUserBasket = $.querySelector(".showBasket");
let LogInPage = $.querySelector('.LogInPage')
let HomePage = $.querySelector('.HomePage')

// function
function renderLibrary(list) {
  let template = `<section class="products">`;
  template += list
    .map((item) => {
      return `
           <div class="product">
                <img src="./images/${item.imgSrc}" />
                <h3>${item.title}</h3>
                <h5>${item.author}</h5>
                <span>${item.price}$</span>
                ${
                  !BASKET.find((basketItem) => basketItem.id === item.id)
                    ? `<button onclick="handleAddToBasket('${item.id}')">ADD TO BASKET</button>`
                    : `<h4>ADDED TO BASKET</h4>`
                }
            </div>`;
    })
    .join("");

  template += "</section>";
  root.innerHTML = template;
  basket.textContent = BASKET.length;
}

function renderBasket(userBasket) {
  let template = `<section class="baskets">`;
  template += userBasket
    .map((item) => {
      return `
            <div class="product basket">
                <img src="./images/${item.imgSrc}" />
                <h3>${item.title}</h3>
                <h5>${item.author}</h5>
                <span>${item.price}$</span>
                <button onclick="removeBookBasket('${item.id}')" class='delete'>REMOVE FROM BASKET </button>
                <input class="input-number" type="number" value="${item.count}" />
            </div>
            `;
    })
    .join("");

  template +=
    '</section><div class="btn"><button class="homeBtn" onclick="backToHome()">HOME</button><h3>Total Price : (<span id="price"></span>)</h3></div>';
  root.innerHTML = template;
  basket.textContent = BASKET.length;

  let inputBskets = document.querySelectorAll(".input-number");

  inputBskets.forEach((inputBsket, key) => {

    inputBsket.oninput = function () {
      updateBookCount(BASKET[key], inputBsket.value);
    }
  })
}

function renderLoginPage () {
  let template = 
     `
        <section>
          <div id="loginContainer">
          <h2>Sign UP</h2>
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
        </section>
      `
  root.innerHTML = template;
  

  let inputLoginName = $.querySelector('.inputLoginName')
  let inputLoginEmail = $.querySelector('.inputLoginEmail')
  let inputLoginNumber = $.querySelector('.inputLoginNumber')
  let inputLoginPassword = $.querySelector('.inputLoginPassword')
  let errorSpan = $.querySelector('#error')

  function handelRegaxPattern (regax) {
    return (event) => {
      const input = event.target
      const value = event.target.value
      const isValid = regax.test(value)

      if (isValid) {
        errorSpan.textContent = "success"
        input.classList.remove("error")
        input.classList.add("success")
      } else {
        input.classList.add("error")
        errorSpan.textContent = 'please enter correct valies !'
      }
    }
  }

  inputLoginNumber.addEventListener('keyup',
    handelRegaxPattern(/^(\+989|0?9)\d{2}[- ]?(\d{3})[- ]?(\d{4})$/)
  )
  inputLoginName.addEventListener('keyup', 
    handelRegaxPattern(/^[آ-ی ء چ]+$/)
  )
  inputLoginEmail.addEventListener('keyup', 
    handelRegaxPattern(/^[a-z0-9_.]{3,}@[a-z0-9-]{1,}.[a-z]{2,}$/)
  )
  inputLoginPassword.addEventListener('keyup', 
    handelRegaxPattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)
  )
}

function handleAddToBasket(bookId) {
  const finded = BOOKS.find((book) => book.id === +bookId);
  BASKET.push(finded);
  renderLibrary(BOOKS);
}

function removeBookBasket(removeId) {
  const targetBook = BASKET.find(function (rmBook) {
    return rmBook.id === +removeId;
  });
  // back to normal count
  targetBook.count = "1";
  BASKET = BASKET.filter(function (rmBook) {
    return rmBook.id !== +removeId;
  });
  basket.textContent = BASKET.length - 1;
  renderBasket(BASKET);
  calcTotalPrice(BASKET);
}

input.addEventListener("keyup", function (event) {
  const value = event.target.value;
  const search = BOOKS.filter((book) => book.title.search(value) > -1);
  renderLibrary(search);
});

let totalPriceValue = 0;

function calcTotalPrice(userPrice) {
  let totalPrice = document.querySelector("#price");
  totalPriceValue = 0;
  userPrice.map(function (product) {
    totalPriceValue += product.count * product.price;
  });

  totalPrice.innerHTML = totalPriceValue;
}

function updateBookCount(basket, counter) {
  console.log("product id: " + basket.id + " new count: " + counter);

  basket.count = counter;

  calcTotalPrice(BASKET);
}


function backToHome() {
  renderLibrary(BOOKS);
}

// events
window.addEventListener("load", () => {
  renderLibrary(BOOKS);
});
showUserBasket.addEventListener("click", () => {
  renderBasket(BASKET);
  calcTotalPrice(BASKET);
});

flag = false
if (LogInPage.style.display = 'inline') {
  LogInPage.addEventListener('click', ()=> {
    renderLoginPage()
    LogInPage.style.display = 'none'
    HomePage.style.display = 'inline'
    flag = true
  })
}  if (flag = true) {
  HomePage.addEventListener('click', ()=> {
    renderLibrary(BOOKS)
    LogInPage.style.display = 'inline'
    HomePage.style.display = 'none'
  })
}




