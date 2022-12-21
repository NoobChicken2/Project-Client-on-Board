import {apiData} from "../stores/store";
let customers;
export async function loadCustomers() {
    const resp = await fetch('http://localhost:3000/customers');
    customers = await resp.json();

    apiData.update((oldValue) => {
        return customers;
    });
}


export async function removeCustomer(id) {
    return await fetch(`http://localhost:3000/customers/${id}`, {method: 'DELETE'})
        .then((response) => response.json())
        .then((data) => {
            return data;
        });
}