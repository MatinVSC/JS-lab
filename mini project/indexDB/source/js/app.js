const $ = document;
const registerForm = $.querySelector('.register-form');
const nameInput = $.querySelector('.name-input');
const passwordInput = $.querySelector('.password-input');
const emailInput = $.querySelector('.email-input');
const tableUsers = $.querySelector('table');

let db = null
let objectStore = null

window.addEventListener('load', () => {
    let DBOpenReq = indexedDB.open('SabzLearn', 15)

    DBOpenReq.addEventListener('error', (err) => {
        console.warn('Error', err);
    })
    
    DBOpenReq.addEventListener('success', (event) => {
        db = event.target.result;
        getUsers();
        console.log('Success', event.target.result);
    })

    DBOpenReq.addEventListener('upgradeneeded', (event) => {

        db = event.target.result

        console.log('Old V:', event.oldVersion);
        console.log('New V:', event.newVersion);
        
        if (!db.objectStoreNames.contains('users')) {
            objectStore = db.createObjectStore('users', {
                keyPath: 'userID'
            });
        }
        if (db.objectStoreNames.contains('courses')) {
            db.deleteObjectStore('courses')
        };
        // db.createObjectStore('courses')
        console.log('upgrade', db.objectStoreNames);
    })
});


registerForm.addEventListener('submit', event => {
    event.preventDefault();
    
    let newUser = {
        userID: Math.floor(Math.random() * 9999),
        name: nameInput.value,
        password: passwordInput.value,
        email: emailInput.value,
    };   

    let tx = createTX('users', 'readwrite');

    tx.addEventListener('complate', event => {
        console.log(event);
    });

    let store = tx.objectStore('users');
    let request = store.add(newUser);

    request.addEventListener('error', (err) => {
        console.warn('rq errooor', err);
    });

    request.addEventListener('success', event => {
        console.log('rq', event);
        clearInput();
        getUsers();
    });
});


function clearInput () {
    nameInput.value = '';
    passwordInput.value = '';
    emailInput.value ='';
};

function getUsers () {
    let tx = createTX('users', 'readonly');

    tx.addEventListener('complate', event => {
        console.log('tx', event);
    });

    let store = tx.objectStore('users');
    let request = store.getAll();

    request.addEventListener('error', (err) => {
        console.warn('get rq errooor', err);
    });

    request.addEventListener('success', event => {
        console.log('get rq', event);
        let allUsers = event.target.result;

        tableUsers.innerHTML = `
                  <tr>
        <th>ID</th>
        <th>Name</th>
        <th>password</th>
        <th>email</th>
        <th>action</th>
        </tr>
        `;

        tableUsers.innerHTML += allUsers.map( user => {
            return `
        <tr>
            <td>${user.userID}</td>
            <td>${user.name}</td>
            <td>${user.password}</td>
            <td>${user.email}</td>
            <td><a href="#" onclick="removeUsers(${user.userID})" >REMOVE</a></td>
        </tr>
            `
        }).join("");
    });
};

function createTX (storeName, mode) {
    let tx = db.transaction(storeName, mode);

    tx.addEventListener('error', (err) => {
        console.warn('errooor', err);
    });

    return tx;
};

function removeUsers (userID) {
    event.preventDefault();

    let tx = createTX('users', 'readwrite');
    tx.addEventListener('complate', event => {
        console.log('delete tx', event);
    });

    let store = tx.objectStore('users');
    let request = store.delete(userID);

    request.addEventListener('error', (err) => {
        console.warn('dl rq errooor', err);
    });

    request.addEventListener('success', event => {
        console.log('dl rq', event);
        getUsers();
    });
}

console.log(typeof this);