// Sly wolf !!!

let animals = ["sheep", "sheep", "wolf", "sheep", "sheep" ] ;

let findWolf = animals.findIndex(function (animal){

    return animal === "wolf" ; 
}) 

let result = ++findWolf

alert("Oh! sheep number " + result + " run away otherwise the wolf would eat you !")