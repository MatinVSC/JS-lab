// Cars exhibition

let showImg = document.querySelector(".showIMG") ;

let imgs = document.querySelector(".gallery").getElementsByTagName("img") ;

let imgSrc = [] ;

let modelCar = [
    "BMW M",
    "benz G class",
    "Lamborghini",
    "Maserati",
    "Porshe 911"
]

let carName = document.querySelector(".textContent")

for (let i = 0; i < imgs.length; i++) {

    imgSrc.push( imgs[i].getAttribute("src")) ;
}

function setImgSrc (num) {

    showImg.setAttribute("src" , imgSrc[num])
    carName.innerHTML = modelCar[num]
}