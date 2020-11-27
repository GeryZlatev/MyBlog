import { extendContext } from './data.js';

export default function(context) {
    extendContext(context)
        .then(function() {
            this.partial('../templates/login.hbs');
        });
}

export function loginUser(context) {
    const { email, password } = context.params;
    UserModel.signInWithEmailAndPassword(email, password)
        .then((userData) => {
            saveUserData(userData);
            this.redirect('#/home');
        })
        .catch(errorHandler);

}