import jwt_decode from "jwt-decode";

export let apiToken: String;

export let dummyAPILoginResponse: Response;

// @ts-ignore
export function handleToken(response){
    /**
    console.log(response);
    let payload = jwt_decode(response.token);
    // @ts-ignore
    console.log(JSON.stringify(payload));
    // @ts-ignore
    apiToken = payload.token;
    console.log("token: " + apiToken);
     **/

    apiToken = response.token;
}

export async function logIn() {
    try {

        // hard-coded login details
        let body = {
            "username": "server",
            "password": "password"
        }
        dummyAPILoginResponse = await fetch('http://localhost:3060/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });
        return await dummyAPILoginResponse.json();
    } catch (e) {
        console.log(e);

    }
}