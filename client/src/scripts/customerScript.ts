import {apiData} from "../stores/store";

let customers;
let response;

export async function loadCustomers() {
    const resp = await fetch('http://localhost:3000/customers');
    customers = await resp.json();

    apiData.update((oldValue) => {
        return customers;
    });
}

export async function logIn(username, password) {
    try {

        let body = {
            username: username,
            password: password
        }
        response = await fetch('http://localhost:3000/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });
        return await response.json();
    } catch (e) {
        throw new Error(response.json())

    }
}

export async function patchCustomer(id, updateBody) {
    try {

        response = await fetch('http://localhost:3000/customers/' + id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateBody)
        });
        return await response.json();
    } catch (e) {
        throw e
    }

}


export async function removeCustomer(id) {
    return await fetch(`http://localhost:3000/customers/${id}`, {method: 'DELETE'})
        .then((response) => response.json())
        .then((data) => {
            return data;
        });
}


export async function addCustomer(data) {
    await fetch(`http://localhost:3000/customers`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            company_id: data.company_id,
            role: "Client",
            username: data.username,
            password: data.password,
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            phone_number: data.phone_number
        })
    }).then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
}

export function isValidCustomer(customer) {

    if (customer.username === undefined || null || "" || customer.username.length == 0) {
        alert("Username cannot be empty, null or undefined")
        return false;
    }

    if (customer.password === undefined || null || "" || customer.password.length == 0) {
        alert("Password cannot be empty, null or undefined")
        return false;
    }

    if (customer.repeat_password === undefined || null || "" || customer.repeat_password.length == 0) {
        alert("Repeat password cannot be empty, null or undefined")
        return false;
    }
    if (customer.first_name === undefined || null || "" || customer.first_name.length == 0) {
        alert("First name cannot be empty, null or undefined")
        return false;
    }

    if (customer.last_name === undefined || null || "" || customer.last_name.length == 0) {
        alert("Last name cannot be empty, null or undefined")
        return false;
    }

    if (customer.email === undefined || null || "" || customer.email.length == 0) {
        alert("Email cannot be empty, null or undefined")
        return false;
    }

    if (customer.phone_number === undefined || null || "" || customer.phone_number.length == 0) {
        alert("Phone number cannot be empty, null or undefined")
        return false;
    }

    if (customer.username.length < 3) {
        alert("Username is too short")
        return false;
    }

    if (customer.password.length < 8) {
        alert("Password must be at least 8 characters")
        return false;
    }
    if (customer.phone_number.length < 10 || isNaN(customer.phone_number)) {
        alert("Phone number is not valid")
        return false;
    }

    console.log(customer.email)

    if (!validateEmail(customer.email)) {
        alert("Email is invalid");
        return false;
    }

    return true;
}

function validateEmail(email) {
    let re = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return re.test(email);
}
