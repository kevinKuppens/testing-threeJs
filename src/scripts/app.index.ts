import { LoginController } from './gestionsControllers/login.controller';

const init = () => {
    // eslint-disable-next-line no-console
    console.log('Local application initiated');


    //LOGIN
    const login = new LoginController();
    login.init();
};

// window.addEventListener('onload', init);

window.addEventListener('load', init);