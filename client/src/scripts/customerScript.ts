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
export async function  logIn(username,password){
    try{


        let body = {
            username:username,
            password:password
        }
        response = await fetch('http://localhost:3000/token',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });
        return await response.json();
    }catch (e){
        throw new Error(response.json())

    }
}


export async function removeCustomer(id) {
    return await fetch(`http://localhost:3000/customers/${id}`, {method: 'DELETE'})
        .then((response) => response.json())
        .then((data) => {
            return data;
        });
}