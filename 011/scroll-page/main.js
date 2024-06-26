
// dom nods
let $ = document;
let postList = $.querySelector('.postList')
let paginationList = $.querySelector('.pagination')
let selectBox = $.querySelector('#selectBox')
let header = $.querySelector('header')
let pervPage = 10;
let DATA;
let PAGE = 1;


// API

const postRequest = new XMLHttpRequest();
postRequest.open('GET', "https://jsonplaceholder.typicode.com/posts")
postRequest.send();

const userRequest = new XMLHttpRequest();
userRequest.open('GET', "https://jsonplaceholder.typicode.com/users")
userRequest.send()

// function

function getData () {
    if (postRequest.readyState === 4 && postRequest.status === 200) {
        let dataPost = JSON.parse(postRequest.responseText);
        renderPosts(dataPost, 1)
        renderPagnation(dataPost)
        // renderSelectBox(dataPost)
        DATA = dataPost
    }
}

function getUsers () {
    let dataUsers = JSON.parse(userRequest.responseText);
    renderSelectBox(dataUsers)
}

function renderPosts (list) {

  let start = (PAGE - 1) * pervPage;
  let end = pervPage * PAGE;  
  let template = list.slice(start, end).map( post => {

        return `
            <div class="post">
                <span>post Number : ${post.id}</span>
                <h2>${post.title}</h2>
                <p>${post.body}</p>
            </div>    
        `
    }).join("");

    postList.innerHTML = template;
}


function renderPagnation (list) {
    
    const pageLength = (list.length / pervPage);
    const pageArr = Array.from({length : pageLength}, (_,i) => i+1);
    let template = pageArr.map( page => {
        return `
            <button class="${PAGE === page ? 'active' : "" }" onclick="handelPagination(${page})">${page}</button>
        `
    }).join("");

    paginationList.innerHTML = template;
}


function handelPagination () {
    PAGE++;
    renderPosts(DATA)
    renderPagnation(DATA)
    window.scrollTo({top : 0, behavior : "smooth"})
}

function renderSelectBox (list) {
    let template = list.map( item => {
        return `
            <option onchange="handelFilterPost" class="option" value="${item.id}">${item.name}</option>
        `
    }).join("");

    selectBox.innerHTML = template;
}

function handelFilterPost (list) {

    list.filter( function (item) {
        if (selectBox.value = item.userId) {
            renderPosts(dataPost.userId)
        }
    })
}
let userScroll = 0;

function handelScroll () {

    
    if (window.scrollY > userScroll) {
        header.classList.remove('scroll')
    } else {
        header.classList.add('scroll')
    }
    userScroll = window.scrollY;
 }


function handelTheme (theme) {
    localStorage.setItem('theme', theme)

    if (theme === "darkMod") {
    document.body.classList.add(theme)
    } else {
    document.body.classList.remove(theme)
    }
}

// events
postRequest.addEventListener('load', getData);
userRequest.addEventListener('load', getUsers);
window.addEventListener("scroll", handelScroll);
window.addEventListener('load', () => {
    const theme = localStorage.getItem('theme');
    handelTheme(theme)
}) 