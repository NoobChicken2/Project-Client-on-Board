import {apiData} from "../stores/store";

let companies;

export async function loadCompanies() {
    const resp = await fetch('http://localhost:3000/companies');
    companies = await resp.json();

    apiData.update((oldValue) => {
        return companies;
    });
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


