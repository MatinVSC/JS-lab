// create multiply

let userNumber = [];
let sum = 0;
let canter = 1;

while (sum != -1) {
    sum = +prompt("enter the number : \n enter -1 if yoy dont enter any number", 0)

    if (sum != -1) {
        userNumber.push(sum)
    } 
}

for (let i = 0; i < userNumber.length; i++) {
    canter = canter * userNumber[i]
}

console.log(canter)