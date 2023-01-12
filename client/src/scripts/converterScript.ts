import {apiData} from "../stores/store";
let converters;
export async function loadConverters() {
    const resp = await fetch('http://localhost:3000/converters');
    converters = await resp.json();

    apiData.update((oldValue) => {
        return converters;
    });
}
export async function addConverter(ownerId,installerId,expected_throughput){
    let Converter = {
        owner_id:ownerId,
        installer_id:installerId,
        expected_throughput:expected_throughput

    }
    const resp = await  fetch('http://localhost:3000/converters',{
        method: 'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify(Converter)

    });
    return await resp.json();
}
export async function removeConverter(converterId){
   const resp =  await fetch('http://localhost:3000/converters/'+converterId,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
        },

    });
    return resp.json;
}
export async function getConverterByOwnerId(url) {
    const resp = await fetch(url);
    let converters =  await resp.json();

    apiData.update((oldValue) => {
        return converters;
    });
}