const boxes = document.querySelectorAll("#box") ;

//functions

let redValue, greenValue, blueValue ;

let colorsArrey = [] ;

let checkArrey = [] ;
 
for (let i = 0; i < 16; i++) {

redValue = Math.floor(Math.random() * 255);
greenValue = Math.floor(Math.random() * 255);
blueValue = Math.floor(Math.random() * 255);

let colors ='rgb(' + redValue + ',' + greenValue + ',' + blueValue + ')' ;

colorsArrey.push(colors);

}


function changeBackground (temp) {

document.body.style.backgroundColor = colorsArrey[temp] ;

let checkArrValue = checkArrey.some ( function ( elem ) {

    if ( elem == colorsArrey[temp] ) 
        return true 
 });

if ( !checkArrValue )
    checkArrey.push(colorsArrey[temp])

};

function checkGame () {

    if ( checkArrey.length == 16 ) {
        alert('The GAME ended successfully.'); 
     } else {
         alert('Please click on all options.');
     }
}




