export function checkInput(req:any,resp:any,next:any){
    console.log(req.body === undefined)
    console.log(req.body == null)
    if (req.body === undefined){
        return resp.status(404).json({error: "Invalid input!"})
    }
     return next();
}
export function compareLoginDetails (req: any, resp: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string }): void; new(): any; }; }; json(param: { error: string }): void; }, next: any){
    console.log(req.body === undefined)
    console.log(req.body == null)
    if (req.body === undefined){
        return resp.status(404).json({error: "Invalid input!"})
    }
    return next();
}