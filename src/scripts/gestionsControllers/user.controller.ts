import { APIRest } from "./APIRest.controller";

export class UserController {
    registerForm: any = document.getElementById('reg-form');
    init(){
        this.registerForm.addEventListener('submit', this.register.bind(this));
    }
    async register(event:Event){
        event.preventDefault();
        const { username, email, password, firstname, lastname, profilePic} = this.registerForm.elements;
        console.log(username.value,
            email.value,
            password.value,
            firstname.value,
            lastname.value);
        const user = await APIRest.register({
            username : username.value,
            email : email.value,
            password : password.value,
            firstname : firstname.value,
            lastname : lastname.value
        });
        if(user){
            console.log(user);
        }else{
            console.log('ERROR - NOT REGISTRED');
        }
    }
}