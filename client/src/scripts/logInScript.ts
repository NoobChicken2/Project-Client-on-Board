import jwt_decode from "jwt-decode"
export function handleToken(response){
    localStorage.setItem('token',response.token);
    let payload = jwt_decode(response.token)
    // @ts-ignore
    localStorage.setItem('role', payload.role);
    // @ts-ignore
    localStorage.setItem('username', payload.username);
    // @ts-ignore
   localStorage.setItem('id',payload.user_id);
   // @ts-ignore
    localStorage.setItem('company_id', payload.company_id);

}