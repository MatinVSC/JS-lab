// dom nodes
const divs = document.querySelectorAll(".pages > div");

let CURRENT_STEP = 0;

function setActiveStep(currentStep) {
  divs.forEach((element, index) => {
    if (index < currentStep) {
        console.log(element)
        // console.log(element.parentElement)
        // console.log(element.children)
        // console.log(element.nextElementSibling)

        

      element.classList.add("active");
    //   element.nextElementSibling.classList.add("active")
    } else {
      element.classList.remove("active");
    }
  });
}

function handleNext() {
    CURRENT_STEP++;
    setActiveStep(CURRENT_STEP)
}


function handlePrev() {
    CURRENT_STEP--;
    setActiveStep(CURRENT_STEP);
}