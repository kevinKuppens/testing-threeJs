export class APIRest{
    static baseUrl = 'http://localhost:3000'
    static login(values:any){
        const options = {
            method : 'POST',
            body : JSON.stringify(values),
            headers : {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        };
        return APIRest.execute('api/login', options);
    }
    static async execute(action: string, options ={}){
        try{
            const rawRespone = await fetch(`${this.baseUrl}/${action}`, options);
            const response = await rawRespone.json();
            return response;
        }catch(e){
            return e;
        }
    }
}