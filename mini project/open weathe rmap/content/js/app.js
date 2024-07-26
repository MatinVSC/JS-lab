let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const imgSrc = ['./content/images/bg.jpg', './content/images/1.jpg', './content/images/3.jpg'];

const input = document.querySelector('input');
const cityName = document.querySelector('.city');
const temp = document.querySelector('.temp');
const weather = document.querySelector('.weather');
const hilow = document.querySelector('.hi-low');
const date = document.querySelector('.date');
let imgIndex = 0;

const apiData = {
    url: "https://api.openweathermap.org/data/2.5/weather?q=",
    key: "9eb7bceab50f9e9dd095c283f9bed5b8"
};

function fetchData () {
    const cityValue = input.value;

    fetch (`${apiData.url}${cityValue}&&appid=${apiData.key}`)
    .then ( response => response.json())
    .then ( data => showData(data))
};

function showData (data) {
    cityName.innerHTML = `${data.name}, ${data.sys.country}`;
    temp.innerHTML = `${Math.floor(data.main.temp - 273.15)}°c`;
    weather.innerHTML = `${data.weather[0].main}`;
    hilow.innerHTML = `${Math.floor(data.main.temp_min - 273.15)}°c / ${Math.floor(data.main.temp_max - 273.15)}`;
    date.innerHTML = showDate();
};


function showDate () {
    let now = new Date();
    let day = days[now.getDay()];
    let month = months[now.getMonth()];
    let year = now.getFullYear();
    let date = now.getDate();

    return `${day} ${date} ${month} ${year}`
};


input.addEventListener('keyup', (event) => {
    if (event.keyCode === 13 ) {
        fetchData();
    }
});


function imgInterval () {
    imgIndex++;
    if (imgIndex > imgSrc.length - 1) {
        imgIndex = 0;
    }
    document.body.style.backgroundImage = `url(${imgSrc[imgIndex]})`;
};

setInterval(imgInterval, 7000);