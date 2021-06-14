/* eslint-disable no-console */
import { APIRest } from './APIRest.controller';

export class LoginController{
    loginForm: any = document.getElementById('login-form') as HTMLFormElement;

    init(){
        
        this.loginForm.addEventListener('submit', this.login.bind(this));
    }
    async login(event:Event){
        event.preventDefault();
        const {username, password} = this.loginForm.elements;
        const token = await APIRest.login({username : username.value, password: password.value});
        if(typeof token === 'string'){
            console.log(token);
            console.log('CONNECTE');
        }else{
            console.log('WRONG CREDENTIAL');
        }
    }
}