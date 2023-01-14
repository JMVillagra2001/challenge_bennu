const URL = 'http://localhost:3000/users';

/********************************
 * QUESTION 1.
 *******************************/
function executeQ1() {
    const name = document.getElementById('my-name');
    name.innerHTML = "Juan Martin Villagra";
}

/********************************
 * QUESTION 2.
 *******************************/
var listItems = [
    'Settings',
    'Customer Support',
    'On Demand',
    'Search',
    'Widgets'
];

function executeQ2() {
    let list = document.getElementById('q2-list');
    listItems.forEach((item) => {
        let component = document.createElement('li');
        component.textContent = item;
        list.appendChild(component);
    });
}

/********************************
 * QUESTION 3.
 *******************************/
function Person() {
    var name = '';

    this.setName = function(n) {
        name = n;
    };

    this.getName = function() {
        return name;
    }
}

function executeQ3() {
    let list = document.getElementById('q3-list');
    
    let personScott = new Person();
    personScott.setName("Scott");

    let personMatt = new Person();
    personMatt.setName("Matt");

    let scottComponent = document.createElement('li');
    scottComponent.textContent = personScott.getName();
    list.appendChild(scottComponent);

    let mattComponent = document.createElement('li');
    mattComponent.textContent = personMatt.getName();
    list.appendChild(mattComponent);
    
}

/********************************
 * QUESTION 4.
 *******************************/
// Answer goes here
var counterUsers = 0;

async function createUser(form) {
    let userData = generateUserData(form)
    try {
        let fetchOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(userData),
        }

        let res = await fetch(URL, fetchOptions)

        if (!res.ok) {
            let error = await res.text();
            throw new Error(error);
        }

        const json = await res.json()
        const user = json.message

        document.getElementById('users-count').textContent = ++counterUsers

        let usersList = document.getElementById('q5-answer');
        
        let component = document.createElement('p')
        component.textContent = user.name || '<Usuario sin nombre>';
        usersList.appendChild(component);
        
        return false; 
    } catch (error) {
        console.log(`Ocurrio un error: ${error}`)
    }
}

function generateUserData(form) {
    return {
        name: form.querySelector('input[name="name"]').value,
        username: form.querySelector('input[name="username"]').value,
        email: form.querySelector('input[name="email"]').value,
        address: {
            street: form.querySelector('input[name="street"]').value,
            suite: form.querySelector('input[name="suite"]').value,
            city: form.querySelector('input[name="city"]').value,
            zipcode: form.querySelector('input[name="zipcode"]').value,
            geo: {
                lat: form.querySelector('input[name="lat"]').value,
                lng: form.querySelector('input[name="lng"]').value
            }
        },
        phone: form.querySelector('input[name="phone"]').value,
        website: form.querySelector('input[name="website"]').value,
        company: {
            name: form.querySelector('input[name="companyName"]').value,
            catchPhrase: form.querySelector('input[name="companyCatchPhrase"]').value,
            bs: form.querySelector('input[name="companyBs"]').value
        }
    }
}
/********************************
 * QUESTION 5.
 *******************************/
async function executeQ5() {
    try {
        let fetchOptions = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        }

        const URL = 'http://localhost:3000/users';
        let res = await fetch(URL, fetchOptions)

        if (!res.ok) {
            let error = await res.text();
            throw new Error(error);
        }
        let json = await res.json()
        
        let usersList = document.getElementById('q5-answer');
        json.users.forEach((user) => {
            let component = document.createElement('p');
            component.textContent = user.name || '<Usuario sin nombre>';
            usersList.appendChild(component);
        })

        counterUsers = json.users.length
        document.getElementById('users-count').textContent = counterUsers

        return false; 
    } catch (error) {
        console.log(`Ocurrio un error: ${error}`)
    }
}
