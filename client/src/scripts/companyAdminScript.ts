export async function addCompanyAdmin(data) {
    await fetch(`http://localhost:3000/companyadmins`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+ localStorage.getItem('token')
        },
        body: JSON.stringify({
            company_id: data.admin_company_id,
            role: "CompanyAdmin",
            username: data.admin_username,
            password: data.admin_password,
            first_name: data.admin_first_name,
            last_name: data.admin_last_name,
            email: data.admin_email,
            phone_number: data.admin_phone_number
        })
    }).then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
}