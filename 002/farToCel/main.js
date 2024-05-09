// dom
let $ = document

const firstValue = $.querySelector('.C');
const secondValue = $.querySelector('.F');
const converter = $.querySelector('#converter'); 
const result = $.querySelector('.result');
const convertButton = $.querySelector('.convertButton');
const resettButton  = $.querySelector('.resetButton');
const changeButton  = $.querySelector('.changeButton');


convertButton.addEventListener('click', function (){

    if (converter.value === '') {
        result.innerHTML = 'insert correct value'
        result.style.color = 'red'
    } else {
        if (firstValue.innerHTML === '°C') {
            let finalValue = ( converter.value * 1.8 ) + 32 ;
            result.innerHTML = converter.value + '°C to ' + finalValue.toFixed(2) + ' °F' ;
        } else {
            let finalValue = ( converter.value - 32 ) * 5 / 9 ;
            result.innerHTML = converter.value + '°F to ' + finalValue.toFixed(2) + ' °C' ;
        }
    } 
})

resettButton.addEventListener('click', function (){

    result.innerHTML = ''
    converter.value = ''
})

changeButton.addEventListener('click', function (){

    if (firstValue.innerHTML === '°C') {
        firstValue.innerHTML = '°F'
        secondValue.innerHTML = '°C'
        converter.setAttribute('placeholder', '°F')
        $.title = '°F to °C'
    } else {
        firstValue.innerHTML = '°C'
        secondValue.innerHTML = '°F'
        converter.setAttribute('placeholder', '°C')
        $.title = '°C to °F'
    }
})