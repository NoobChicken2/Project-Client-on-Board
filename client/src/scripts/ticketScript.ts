import {apiData} from "../stores/store";
let tickets;
export async function loadTickets() {
    const resp = await fetch('http://localhost:3000/tickets');
    tickets = await resp.json();

    apiData.update((oldValue) => {
        return tickets;
    });
}