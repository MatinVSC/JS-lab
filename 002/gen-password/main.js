// password generator

function genPassword () {

    let pass = document.getElementById("password") ;
    let password = "" ;
    let passLenght = 8 ;
    let chars = "1234567890QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm" ;

    for (let i = 0; i < passLenght; i++) {

        let rand = Math.floor(Math.random() * chars.length);
        password += chars.substring(rand, rand+1);
    }

    document.getElementById("password").value = password ;
}

