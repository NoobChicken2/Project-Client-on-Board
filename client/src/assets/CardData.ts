import motherboard from "../assets/motherboard.svg";
import ticket from "../assets/ticket-perforated.svg";
import customer from "../assets/people.svg";
import companies from "../assets/buildings.svg";

export const clientCards = [
    {
        cardTitle: "Converters",
        img : motherboard,
        link: `http://localhost:3030/converters`
    },
    {
        cardTitle: "Tickets",
        img : ticket,
        link: `http://localhost:3030/tickets`
    }
]

export const companyAdminCards = [
    {
        cardTitle: "Customers",
        img : customer,
        link: `http://localhost:3030/customers`
    },
    {
        cardTitle: "Converters",
        img: motherboard,
        link: `http://localhost:3030/converters`
    },
    {
        cardTitle: "Tickets",
        img: ticket,
        link: `http://localhost:3030/tickets`
    },
]

export const globalAdminCards = [
    {
        cardTitle: "Users",
        img : customer,
        link: `http://localhost:3030/customers`
    },
    {
        cardTitle: "Companies",
        img: companies,
        link: `http://localhost:3030/companies`
    },
    {
        cardTitle: "Converters",
        img: motherboard,
        link: `http://localhost:3030/converters`
    },
    {
        cardTitle: "Tickets",
        img: ticket,
        link: `http://localhost:3030/tickets`
    }
]
