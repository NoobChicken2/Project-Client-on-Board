import {apiData} from "../stores/store";

let converters;

export async function loadConvertersGlobal() {
    const resp = await fetch('http://localhost:3000/converters', {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    });
    converters = await resp.json();

    apiData.update((oldValue) => {
        return converters;
    });
}

export async function loadSelectConverters(installerId) {
    const resp = await fetch('http://localhost:3000/converters/installer/' + installerId, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    });
    converters = await resp.json();

    apiData.update((oldValue) => {
        return converters;
    });
}

export async function loadClientConverters(ownerId) {
    const resp = await fetch('http://localhost:3000/converters/owner/' + ownerId, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    });
    converters = await resp.json();

    apiData.update((oldValue) => {
        return converters;
    });
}


export async function editConverter(data, id) {
    if (validateConverterUpdate(data)) {
        return await fetch(`http://localhost:3000/converters/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .catch(err => alert(err))
    }
}

export async function addConverter(ownerId, installerId, expected_throughput, serial_number, converter_name, converter_id,) {
    let Converter = {
        owner_id: ownerId,
        installer_id: installerId,
        expected_throughput: expected_throughput,
        serial_number: serial_number,
        converter_name: converter_name,
        converter_id: converter_id
    }
    const resp = await fetch('http://localhost:3000/converters', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')

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
            'Authorization': 'Bearer ' + localStorage.getItem('token')
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

function validateTextField(field, fieldName) {
    if (field === undefined || field === null || field === "") {
        alert(`${fieldName} cannot be empty, null or undefined`);
        return false;
    }

    return true;
}

export function isValidConverter(ownerId, installerId, expected_throughput, serial_number, converter_name, converter_id) {
    return (validateNumberField(ownerId, "Owner ID") ||
        validateNumberField(installerId, "Installer ID") ||
        validateNumberField(expected_throughput, "Expected Throughput") ||
        validateTextField(serial_number, "Serial Number") ||
        validateTextField(converter_name, "Converter Name") ||
        validateNumberField(converter_id, "Converter ID") );
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

    if (data.serial_number !== undefined) {
        if (isNaN(data.serial_number)) {
            alert("Serial number must be a number")
            return false;
        }

        if (data.serial_number === null) {
            alert("Serial number cannot be null")
            return false;
        }
    }

    if (data.converter_name !== undefined) {
        if (data.converter_name === null) {
            alert("Converter name cannot be null")
            return false;
        }
    }


    return true;
}

export function loadSelectedData() {
    if (localStorage.getItem('role') === 'CompanyAdmin') {
        return loadSelectConverters(localStorage.getItem('company_id'))

    } else if (localStorage.getItem('role') === 'GlobalAdmin') {
        return loadConvertersGlobal()
    } else if (localStorage.getItem('role') === 'Client') {
        return loadClientConverters(localStorage.getItem('id'));
    }
}