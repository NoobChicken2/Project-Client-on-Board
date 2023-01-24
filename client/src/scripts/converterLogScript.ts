import {apiData} from "../stores/store";

let logs;

export async function loadSelectConvertersLogs(converterId) {
    const resp = await fetch('http://localhost:3000/converters/'+converterId+'/logs',{
        headers:{
            'Authorization':'Bearer '+ localStorage.getItem('token')
        }
    });
    logs = await resp.json();
    console.log(logs)

    apiData.update((oldValue) => {
        return logs;
    });
}