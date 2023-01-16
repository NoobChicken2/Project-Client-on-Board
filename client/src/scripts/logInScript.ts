import jwt_decode from "jwt-decode"
export function handleToken(response){
    localStorage.setItem('token',response.token);
    let payload = jwt_decode(response.token)
    // @ts-ignore
    localStorage.setItem('role',payload.role);
    // @ts-ignore
    console.log(payload.user_id);
    console.log(payload)

}