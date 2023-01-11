import {apiData} from "../stores/store";

let companies;

export async function loadCompanies() {
    companies = await fetch('http://localhost:3000/companies').then(res => res.json())
        .catch(err => alert(err));

    apiData.update((oldValue) => {
        return companies;
    });
}

export async function editCompany(id, data) {
    return await fetch(`http://localhost:3000/companies/${id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
        .catch(err => alert(err))
}

export async function removeCompany(id) {
    return await fetch(`http://localhost:3000/companies/${id}`, {method: 'DELETE'})
        .then((response) => response.json())
        .then((data) => {
            return data;
        });
}

export async function addCompany(data) {
    await fetch(`http://localhost:3000/companies`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({company_name: data})
    }).then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
}


export function isValidCompany(name) {

    if (name === undefined || null || "" || name.length === 0) {
        alert("Company name cannot be empty, null or undefined")
        return false;
    }

    if (name.length < 3) {
        alert("Company name is too short")
        return false;
    }

    return true;
}