const divs = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
let userTurn = true ;
let endGame = false;

let datas = {
    1 : [], //row1
    2 : [], //row2
    3 : [], //row3
    4 : [], //column1
    5 : [], //column2
    6 : [], //column3
    7 : [], //main diameter
    8 : []  //sub diameter
}

function addToDatas (event) {

    let div = event.target ;

    let idValue = div.getAttribute('id') ;

    let col = div.getAttribute('column');
    let row = div.getAttribute('row');

    if ( idValue == null ) {

        for ( let i = 1 ; i < 4 ; i++ ) {
            if ( row == 1 && col == i ) {
                datas[1].push(div) 
            }
        } 
    
        for ( let i = 1 ; i < 4 ; i++ ) {        
            if ( row == 2 && col == i ) {
                datas[2].push(div)
            }
        }
    
        for ( let i = 1 ; i < 4 ; i++ ) {
            if ( row == 3 && col == i ) {
                datas[3].push(div)
            }
        }
    
        for ( let i = 1 ; i < 4 ; i++ ) {
            if ( col == 1 && row == i ) {
                datas[4].push(div)
            }
        }
    
        for ( let i = 1 ; i < 4 ; i++ ) {
            if ( col == 2 && row == i ) {
                datas[5].push(div)
            }
        }
    
        for ( let i = 1 ; i < 4 ; i++ ) {
            if ( col == 3 && row == i ) {
                datas[6].push(div)
            }
        }
    
        if ( col == row ) {
            datas[7].push(div)
        }
    
        if ( col == 1 && row == 3 ) {
            datas[8].push(div);
        }
    
        if ( col == 2 && row == 2 ) {
            datas[8].push(div);
        }
    
        if ( col == 3 && row == 1 ) {
            datas[8].push(div);
        }

    }

    div.setAttribute( 'id' , 'clicked')
    checkWinner()
}

function turnGame ( event ) {
    
    if ( event.target.innerHTML == '') {
        if ( userTurn == true ) {
            event.target.innerHTML = 'X'
            statusText.innerHTML = "O's Turn" ;
            userTurn = false;
        } else {
            event.target.innerHTML = 'O'
            statusText.innerHTML = "X's Turn" ;
            userTurn = true;
        }
    }

}


function checkWinner () {
    for ( let i = 1 ; i < 9 ; i++ ) {
        if ( datas[i].length == 3 ) {
            if ( datas[i][0].innerHTML == datas[i][1].innerHTML && datas[i][1].innerHTML ==  datas[i][2].innerHTML ) {
                if ( datas[i][0].innerHTML == "X" ) {
                    endGame = true;
                    setTimeout ( function () {
                        alert ( "user X win")
                    } , 400 )    
                } else {
                    endGame = true;
                    setTimeout ( function () {
                        alert ( "user O win")
                    } , 400 )  
                }
            }
        }
    }
}

function restartGame () {

    for ( let i = 0 ; i < divs.length ; i++ ) {
       divs[i].innerHTML = '';
       divs[i].removeAttribute('id');
    }
    
    statusText.innerHTML == "X's turn"
    userTurn = true;
    endGame = false;
    datas = {
        1 : [], 2 : [], 3 : [], 
        4 : [], 5 : [], 6 : [], 
        7 : [], 8 : [] 
    }

}

function checkEndGame () {

    if ( endGame ) {
        datas = {
            1 : [], 2 : [], 3 : [], 
            4 : [], 5 : [], 6 : [], 
            7 : [], 8 : [] 
        }
        endGame = false;
    }
}

for ( let i = 0 ; i<divs.length ; i++ ) {
    divs[i].addEventListener( 'click' , turnGame );
    divs[i].addEventListener( 'click' , addToDatas );
    divs[i].addEventListener( 'click' , checkEndGame );
}

restartBtn.addEventListener ( 'click' , restartGame ) ;