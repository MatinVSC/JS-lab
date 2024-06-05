// dom nodes
const $ = document
let root = $.querySelector('#root');
let basket = $.querySelector('#basket');
let input = $.querySelector('.search');
let showUserBasket = $.querySelector('.showBasket');
let homeBtn = $.querySelector('.homeBtn')



// function
function renderLibrary (list) {
    let template = `<section class="products">`
    template += list.map(item => {
        return `
           <div class="product">
                <img src="./images/${item.imgSrc}" />
                <h3>${item.title}</h3>
                <h5>${item.author}</h5>
                <span>${item.genre}</span>
                ${
                    !BASKET.find(basketItem => basketItem.id === item.id) 
                    ?
                    `<button onclick="handleAddToBasket('${item.id}')">ADD TO BASKET</button>`
                    :
                    `<h4>ADDED TO BASKET</h4>`
                }
            </div>`
    }).join("");

    template += '</section>';
    root.innerHTML = template;
    basket.textContent = BASKET.length

}

function renderBasket(userBasket) {
    let template = `<section class="baskets">`
    template += userBasket.map(item => {
        return `
            <div class="product basket">
                <img src="./images/${item.imgSrc}" />
                <h3>${item.title}</h3>
                <h5>${item.author}</h5>
                <span>${item.genre}</span>
                <button onclick="removeBookBasket('${item.id}')" class='delete'>REMOVE FROM BASKET </button>
            </div>
            `
    }).join("");

    template += '</section><div class="btn"><button class="homeBtn" onclick="backToHome()">HOME</button></div>';
    root.innerHTML = template;
    basket.textContent = BASKET.length
}


function handleAddToBasket (bookId) {
    const finded = BOOKS.find( book => book.id === +bookId);
    BASKET.push(finded);
    renderLibrary(BOOKS)
}

function removeBookBasket (removeId) {
    
    BASKET = BASKET.filter(function (rmBook){
        return rmBook.id !== +removeId;
    })
    //let findedd = BASKET.findIndex(rmbook => rmbook.id == removeId)
   
    basket.textContent = BASKET.length -1
    renderBasket(BASKET)
}

input.addEventListener('keyup', function(event){
    const value = event.target.value
    const search = BOOKS.filter( book => book.title.search(value) > -1 );
    renderLibrary(search)
})

function backToHome() {
    renderLibrary(BOOKS)
}


// events 
window.addEventListener('load', ()=> {
    renderLibrary(BOOKS)
})
showUserBasket.addEventListener('click', () =>{
    renderBasket(BASKET)
})

    