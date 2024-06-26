
// dom nods
let $ = document;
let postList = $.querySelector('.postList')
let paginationList = $.querySelector('.pagination')
let selectBox = $.querySelector('#selectBox')
let pervPage = 10;
let DATA;


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

function renderPosts (list, page) {

  let start = (page - 1) * pervPage;
  let end = pervPage * page  
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
    
    const pageLength = (list.length / 10);
    const pageArr = Array.from({length : pageLength}, (_,i) => i+1);
    let template = pageArr.map( page => {
        return `
            <button onclick="handelPagination(${page})">${page}</button>
        `
    }).join("");

    paginationList.innerHTML = template;
}


function handelPagination (page) {
    renderPosts(DATA, page)
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


// events
postRequest.addEventListener('load', getData)
userRequest.addEventListener('load', getUsers)