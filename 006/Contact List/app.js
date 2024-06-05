// let countries = ['iran', 'australia', 'brazil', 'USA', 'germany', 'finlans', 'china', 'norway', 'England', 'iyaly', 'georgia', 'UAE', 'argentina']

// let ulElem = document.getElementById('root')

// let scoredCountries = countries.map( country => country.toUpperCase()).sort()

// console.log(scoredCountries)

// function render (list) {
//     ulElem.innerHTML = ''
// for (const country of list) {
//     const li = document.createElement('li');
//     li.textContent = country
//     ulElem.appendChild(li)
// }
// }

// let input = document.getElementById('input')

// input.addEventListener('keyup', function (){

//     let value = event.target.value
//     let finded = scoredCountries.filter(name => name.toLocaleLowerCase().startsWith(value))
//     render(finded)

// })


// let button = document.getElementById('add')

// button.addEventListener('click', function(){

//     let value = input2.value 
//      scoredCountries.push(value.toUpperCase())
//     render(scoredCountries)
// })

// render(scoredCountries)






// model
const countries = [{
    name: 'reza',
    number: '+98001'
},
{
    name: 'alireza',
    number: '+98002'
}

];

// dom nodes
const root = document.getElementById("root")
const input = document.getElementById("newCountry")
let newNumber = document.getElementById('addNumber')


// functions
function render(list) {
    // list = list.map(country => country.toUpperCase()).sort()
    root.innerHTML = "";
    for (const item of list) {
        const li = document.createElement("li")
        li.textContent = `${item.name} - ${item.number}`;
        if(item.number) {
            li.classList.add("red")
        }
        root.appendChild(li)
    }
}

function handleSearch() {
    const value = event.target.value;
    const filterList = countries.filter(country => country.name.startsWith(value))
    render(filterList)
}

function handleAdd() {
    countries.push(
        {
        name: input.value.toUpperCase(),
        number: +newNumber.value
    }
);
    render(countries);
    input.value = ""
}

function handleEnter() {
    if(event.code === "Enter")
        handleAdd();
}



// events
render(countries)











