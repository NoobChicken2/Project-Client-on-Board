import {apiData} from "../stores/store";

let converters;

export async function loadConverters() {
    const resp = await fetch('http://localhost:3000/converters');
    converters = await resp.json();

    apiData.update((oldValue) => {
        return converters;
    });
}

export async function editConverter(data, id) {
    return await fetch(`http://localhost:3000/converters/${id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
        .catch(err => alert(err))
}

export async function addConverter(ownerId, installerId, expected_throughput) {
    let Converter = {
        owner_id: ownerId,
        installer_id: installerId,
        expected_throughput: expected_throughput

    }
    const resp = await fetch('http://localhost:3000/converters', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
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
        },

    });
    return resp.json;
}


export function isValidConverter(ownerId, installerId, expectedThroughput) {
    if (ownerId === undefined || null || "" || ownerId.length == 0) {
        alert("Owner ID cannot be empty, null or undefined")
        return false;
    }

    if (installerId === undefined || null || "" || installerId.length == 0) {
        alert("Installer ID cannot be empty, null or undefined")
        return false;
    }

    if (expectedThroughput === undefined || null || "" || expectedThroughput.length == 0) {
        alert("Expected throughput cannot be empty, null or undefined")
        return false;
    }

    if (isNaN(ownerId)) {
        alert("Owner ID must be a number")
        return false;
    }

    if (isNaN(installerId)) {
        alert("Owner ID must be a number")
        return false;
    }

    if (isNaN(expectedThroughput)) {
        alert("Expected throughput must be a number")
        return false;
    }

    if (ownerId <= 0) {
        alert("Owner ID must be a positive integer")
        return false;
    }
    if (installerId <= 0) {
        alert("Installer ID must be a positive integer")
        return false;
    }

    if (expectedThroughput < 1) {
        alert("Expected throughput must be greater than one")
        return false;
    }


    return true;
}