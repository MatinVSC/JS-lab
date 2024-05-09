// BMI caculator

const weight = +prompt("enter your weight (kg) :", 0 );
const height = +prompt("enter your height (m) :", 0);

function BMICalculator (weight, height) {

    return weight / (height*height)
}

function getBMIStatus (index) {

    if (index < 19) {
        return "UNDERWIGHT";
    }
    if (index > 25) {
        return "OVERWEIGHT";
    }

    return "NORMAL";
}

const bmiIndex = BMICalculator(weight, height);
const status   = getBMIStatus(bmiIndex);

alert("your BMI status is :" + status)
