
// dom nodes
const boxes = document.querySelectorAll("div");
let modal = document.querySelector('.modal') 
let timer = document.querySelector('.timer')
let counterModal = document.querySelector('.counter-modal')
const OPEN_CARDS = [];
let chekGame = []
let counter = 0;
let flag = false 
let time;


// funtions
function showCard(event) {
  event.target.classList.add("show");
  
  OPEN_CARDS.push(event.target);

  if(OPEN_CARDS.length === 2) {

    if(OPEN_CARDS[0].innerHTML === OPEN_CARDS[1].innerHTML) {

      chekGame.push(OPEN_CARDS.length)
      matchCards()
      
    } else {
      unmatchedCards()
    }
  }
}

function matchCards() {
  OPEN_CARDS[0].classList.add("matched")
  OPEN_CARDS[1].classList.add("matched");
  

  OPEN_CARDS.length = 0;
  counter++;
  counterModal.innerHTML = 'movements : ' + counter
  if(counter == undefined) {
    counterModal.textContent = '0'
  }
  
}

function unmatchedCards() {
  OPEN_CARDS[0].classList.add("unmatched")
  OPEN_CARDS[1].classList.add("unmatched");
  counter++
  setTimeout(function(){
    OPEN_CARDS[0].classList.remove("show")
    OPEN_CARDS[1].classList.remove("show");
    OPEN_CARDS[0].classList.remove("unmatched")
    OPEN_CARDS[1].classList.remove("unmatched");
    OPEN_CARDS.length = 0;
    counterModal.innerHTML = 'movements : ' + counter
    
    if(counter == undefined) {
      counterModal.textContent = '0'
    }
  }, 1000);
}

(function () {
  let sec = 0;
  let min = 0;
  time = setInterval(() => {
    timer.innerHTML = ('0' + min + ":" + sec);
    modal.innerHTML = ('0' + min + ":" + sec);
    sec++
    if (sec >= 60) {
      timer.innerHTML = ('0' + min++ + ":" + (sec=0));
      modal.innerHTML = ('0' + min++ + ":" + (sec=0));
      sec++ 
    }
    if (chekGame.length == 8) {
      clearInterval(time)
      modal.style.display = 'inline'
      modal.innerHTML = ('0' + min + ":" + sec);
      modal.innerHTML = (counterModal.innerHTML)
    }
  }, 1000)

})()


// events
for (const box of boxes) {
  box.addEventListener("click", showCard);
}


