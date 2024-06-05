
let lists = document.querySelectorAll('ul')
let input = document.getElementById('search')

console.log(input)


function render (list) {

    let temlate = list.map(item => {

    return `
        <img src=./images/${item.imgSrc}>
        <li>${item.title}</li>
    `
})    

lists.innerHTML = temlate.join("")

    for ( let i = 0; i < lists.length; i++) {

        lists[i].innerHTML = temlate[i]
    }
}

function handelSearch () {

    const serachValue = event.target.value
    const filteredList = BOOKS.filter( book => book.title.search(serachValue) > -1)
    render(filteredList)
}

render(BOOKS)




// for (const item of list) {
//     const liElem = document.createElement('li')
//     liElem.textContent = `${item.title}`
//     lists.appendChild(liElem)
// }






