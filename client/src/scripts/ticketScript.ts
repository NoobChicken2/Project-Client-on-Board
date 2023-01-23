import {apiData} from "../stores/store";

let tickets;

export async function loadTickets() {
    let resp;
    if (localStorage.getItem('role') === 'GlobalAdmin') {
        resp = await fetch('http://localhost:3000/tickets', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
    } else {
        resp = await fetch(`http://localhost:3000/tickets/users/${localStorage.getItem('id')}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
    }
    tickets = await resp.json();

    apiData.update((oldValue) => {
        return tickets;
    });
}