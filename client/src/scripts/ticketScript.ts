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
export function checkingValidTicket() {

}
export async function addTicket(data) {
    let resp;
    resp = await fetch('http://localhost:3000/tickets', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+ localStorage.getItem('token')
        },
        body: JSON.stringify({
            log_id: data.log_id,
            log_event: data.log_event,
            converter_id: data.converter_id
        })
    }).then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error))
}