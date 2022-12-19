import {apiData} from "../stores/store";
let converters;
export async function loadConverters() {
    const resp = await fetch('http://localhost:3000/converters');
    converters = await resp.json();

    apiData.update((oldValue) => {
        return converters;
    });
}