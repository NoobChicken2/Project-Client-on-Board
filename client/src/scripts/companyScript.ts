export async function loadCompanies() {
    let companies: string[];
    companies = await getCompanies();
    return companies;
}


export async function getCompanies() {
    return await fetch('http://localhost:3000/companies')
        .then((response) => response.json())
        .then((data) => {
            return data;
        });
}

export async function removeCompany(id) {
    return await fetch(`http://localhost:3000/companies/${id}`, {method: 'DELETE'})
        .then((response) => response.json())
        .then((data) => {
            return data;
        });
}

