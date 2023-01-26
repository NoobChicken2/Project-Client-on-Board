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
export async function checkingValidTicket(ticket) {
    if(localStorage.getItem('role') === 'CompanyAdmin'){
        let resp = await fetch(`http://localhost:3000/converters/owner/${localStorage.getItem('id')}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
        let converters = await resp.json();
        if(converters.id = ticket.converterID){
            return true;
        }else{
            return false;
        }
    }else if (localStorage.getItem('role') === 'Client') {
        let resp = await fetch(`http://localhost:3000/converters/owner/${localStorage.getItem('id')}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
        let converters = await resp.json();
        if(converters.id = ticket.converterID){
            return true;
        }else{
            return false;
        }
    }else{
        return true;
    }
}
// export async function addTicket(logID) {
//     let data = {
//         log_id: logID
//     }
//     let resp;
//     resp = await fetch('http://localhost:3000/tickets', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization':'Bearer '+ localStorage.getItem('token')
//         },
//         body: JSON.stringify(data)
//     })
//     return await resp.json();
// }
