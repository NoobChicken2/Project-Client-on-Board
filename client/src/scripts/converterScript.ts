import {apiData} from "../stores/store";

let converters;

export async function loadConverters() {
    const resp = await fetch('http://localhost:3000/converters',{
        headers:{
            'Authorization':'Bearer '+ localStorage.getItem('token')
        }
    });
    converters = await resp.json();
    console.log(converters)

    apiData.update((oldValue) => {
        return converters;
    });
}
export async function loadSelectConverters(installerId) {
    const resp = await fetch('http://localhost:3000/converters/installer/'+installerId,{
        headers:{
            'Authorization':'Bearer '+ localStorage.getItem('token')
        }
    });
    converters = await resp.json();
    console.log(converters)

    apiData.update((oldValue) => {
        return converters;
    });
}
export async function loadClientConverters(ownerId) {
    const resp = await fetch('http://localhost:3000/converters/owner/'+ownerId,{
        headers:{
            'Authorization':'Bearer '+ localStorage.getItem('token')
        }
    });
    converters = await resp.json();
    console.log(converters)

    apiData.update((oldValue) => {
        return converters;
    });
}


export async function editConverter(data, id) {
    return await fetch(`http://localhost:3000/converters/${id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+ localStorage.getItem('token')
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
        .catch(err => alert(err))
}

export async function addConverter(ownerId, installerId) {
    let Converter = {
        owner_id: ownerId,
        installer_id: installerId

    }
    const resp = await fetch('http://localhost:3000/converters', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+ localStorage.getItem('token')

        },
        body: JSON.stringify(Converter)

    });
    return await resp.json();
}

export async function removeConverter(converterId) {
    const resp = await fetch('http://localhost:3000/converters/' + converterId, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+ localStorage.getItem('token')
        },

    });
    return resp.json;
}

function validateNumberField(field, fieldName) {
    if (field === undefined || field === null || field === "" || isNaN(field)) {
        alert(`${fieldName} cannot be empty, null, undefined or not a number`);
        return false;
    }
    if (field <= 0) {
        alert(`${fieldName} must be a positive number`);
        return false;
    }
    return true;
}

export function isValidConverter(ownerId, installerId, expectedThroughput) {
    return (validateNumberField(ownerId, "Owner ID") ||
        validateNumberField(installerId, "Installer ID") ||
        validateNumberField(expectedThroughput, "Expected throughput"));

}

export function validateConverterUpdate(data) {
    if (data.owner_id !== undefined) {

        if (isNaN(data.owner_id)) {
            alert("Owner ID must be a number")
            return false;
        }

        if (data.owner_id <= 0) {
            alert("Owner ID must be a positive integer")
            return false;
        }
    }
    if (data.installer_id !== undefined) {

        if (isNaN(data.installer_id)) {
            alert("Installer ID must be a number")
            return false;
        }

        if (data.installer_id <= 0) {
            alert("Installer ID must be a positive integer")
            return false;
        }
    }
    if (data.expected_throughput !== undefined) {
        if (isNaN(data.expected_throughput)) {
            alert("Owner ID must be a number")
            return false;
        }

        if (data.expected_throughput <= 0) {
            alert("Expected throughput must be a positive integer")
            return false;
        }
    }
    return true;
}