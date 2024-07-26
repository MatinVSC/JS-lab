let $ = document;
const usernameInput = $.querySelector('#username');
const passwordInput = $.querySelector('#password');
const remembermeChek = $.querySelector('.ck');
const loginBtn = $.querySelector('.loginBtn')

function setCookie (cookieName, cookieValue, exDay) {
    const time = new Date();
    time.setTime(time.getTime() + (exDay * 24 * 60 * 60 * 1000));
    $.cookie = `${cookieName}=${cookieValue};path=/;expires=${time}`;

};

function clearInput () {
    usernameInput.value = "";
    passwordInput.value = "";
};

loginBtn.addEventListener('click', event => {
    event.preventDefault();

    if (remembermeChek.checked) {
        setCookie('login-token', usernameInput.value, 365);
    }

    clearInput();
});
