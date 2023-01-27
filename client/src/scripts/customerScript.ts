import {apiData} from "../stores/store";
import {loadClientConverters, loadConvertersGlobal, loadSelectConverters} from "./converterScript";

let customers;
let response;

export async function loadCustomersGlobal() {
    const resp = await fetch('http://localhost:3000/users',{
        method: 'GET',
        headers: {
            'Content-Type':'application/json',
            'Authorization':'Bearer '+ localStorage.getItem('token')
        }
    });
    customers = await resp.json();

    apiData.update((oldValue) => {
        return customers;
    });
}
export async function loadSelectCustomers(company_id) {
    const resp = await fetch('http://localhost:3000/customers/company/'+company_id,{
        method: 'GET',
        headers: {
            'Content-Type':'application/json',
            'Authorization':'Bearer '+ localStorage.getItem('token')
        }
    });
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
export async function patchCustomer(id,updateBody) {
    try {

        response = await fetch('http://localhost:3000/customers/' + id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+ localStorage.getItem('token')
            },
            body: JSON.stringify(updateBody)
        });
        return await  response.json();
    }catch (e){
        throw e
    }

}




export async function removeCustomer(id) {
    return await fetch(`http://localhost:3000/customers/${id}`, {
        method: 'DELETE',
        headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer '+ localStorage.getItem('token')
        },
    })
        .then((response) => response.json())
        .then((data) => {
            return data;
        });
}


export async function addCustomer(data) {
    await fetch(`http://localhost:3000/customers`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+ localStorage.getItem('token')
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

function validateField(field, fieldName) {
    if (field === undefined || field === null || field === "" || field.length === 0) {
        alert(`${fieldName} cannot be empty, null or undefined`);
        return false;
    }
    return true;
}

export function isValidCustomer(customer) {

    if (!validateField(customer.username, "Username") ||
        !validateField(customer.password, "Password") ||
        !validateField(customer.repeat_password, "Repeat password") ||
        !validateField(customer.first_name, "First name") ||
        !validateField(customer.last_name, "Last name") ||
        !validateField(customer.email, "Email") ||
        !validateField(customer.phone_number, "Phone number")) {
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

    if (customer.password !== customer.repeat_password) {
        alert("Passwords do not match")
        return false;
    }


    if (!validatePhoneNumber(customer.phone_number)) {
        alert("Phone number is not valid")
        return false;
    }

    if (!validateEmail(customer.email)) {
        alert("Email is invalid");
        return false;
    }

    return true;
}

export function validateCustomerUpdate(updates) {
    if (updates.username !== undefined) {
        if (updates.username.length < 3) {
            alert("Username is too short")
            return false;
        }
    }

    if (updates.password !== undefined) {
        if (updates.password.length < 3) {
            alert("Username is too short")
            return false;
        }
    }

    if (updates.first_name !== undefined) {
        if (updates.first_name.length == 0) {
            alert("First name cannot be empty, null or undefined")
            return false;
        }
    }

    if (updates.last_name !== undefined) {
        if (updates.last_name.length == 0) {
            alert("First name cannot be empty, null or undefined")
            return false;
        }
    }

    if (updates.email !== undefined) {
        if (!validateEmail(updates.email)) {
            alert("Email is invalid");
            return false;
        }
    }

    if (updates.phone_number !== undefined) {
        if (!validatePhoneNumber(updates.phone_number)) {
            alert("Phone number is invalid");
            return false;
        }
    }
    return true;
}

function validateEmail(email) {
    let re = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return re.test(email);
}

function validatePhoneNumber(phone_number) {
    let re = new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im);
    return re.test(phone_number);
}
export async function loadSelectedData(){
    if(localStorage.getItem('role') === 'CompanyAdmin'){
        await  loadSelectCustomers(localStorage.getItem('company_id'))

    } else if (localStorage.getItem('role') === 'GlobalAdmin'){
        console.log("hit")
        await  loadCustomersGlobal()
    }

}
