let arrow = document.querySelectorAll('.box')

document.body.addEventListener('keyup', function(){
    

    let eventKeyCode = event.keyCode

    if (eventKeyCode == '37') {
        arrow[2].classList.toggle('box1')
    }
    else if (eventKeyCode == '39') {
      arrow[1].classList.toggle('box1')
    }
    else if (eventKeyCode == '38') {
      arrow[0].classList.toggle('box1')
    }
    else if (eventKeyCode == '40') {
      arrow[3].classList.toggle('box1')
    }
})



















// arrow.forEach(function (color){

  //  color.addEventListener('keyup', function(event){

            
        //if (event.target.keyCode == '66') {
      //     console.log(arrow[1].classList.toggle('.box')) 
    //    }
        
  //  })
    
//})