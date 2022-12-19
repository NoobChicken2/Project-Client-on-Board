 export async function loadPaintings(){
    const resp = await fetch('http://localhost:3000/paintings');
    paintings = await resp.json();

    apiData.update((oldValue) => {
        return paintings;
    });