import { extendContext, UserModel } from './data.js';

export default function(context) {
    extendContext(context)
        .then(function() {
            this.partial('../templates/register.hbs');
        });
}

export function registerUser(context) {
    const { email, password, repeatPassword } = context.params;

    if (password !== repeatPassword) {
        let error = 'The passwords must match! Please try again!'
        errorHandler(error);
        return;
    }
    UserModel.createUserWithEmailAndPassword(email, password)
        .then((userData) => {
            this.redirect('#/login');
        });
}