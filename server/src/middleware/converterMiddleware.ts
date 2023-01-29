export function checkInput(req:any,resp:any,next:any){

    if (req.body === undefined){
        return resp.status(404).json({error: "Invalid input!"})
    }
     return next();
}
export function compareLoginDetails (req: any, resp: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string }): void; new(): any; }; }; json(param: { error: string }): void; }, next: any){

    if (req.body === undefined){
        return resp.status(404).json({error: "Invalid input!"})
    }
    return next();
}