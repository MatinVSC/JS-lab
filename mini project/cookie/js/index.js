function getCookie (cookieName) {
    cookiesData = document.cookie.split(";");
    let mainCookie = null;

    cookiesData.some( cookie => {
        if (cookie.includes(cookieName)) {
            mainCookie = cookie.substring(cookie.indexOf('=') + 1);
            return true
        }
    });

    return mainCookie;
};

window.addEventListener('load', () => {
    let isLogin = getCookie('login-token');
    console.log(isLogin);

    if (!isLogin) {
        location.href = 'http://127.0.0.1:5500/JS/cookie/login.html';
    }
});