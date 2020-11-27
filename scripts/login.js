import { extendContext, UserModel, saveUserData, errorHandler, notificatin} from './data.js';

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
            let message = 'You are successfully logged in!';
            notificatin(message);
            this.redirect('#/home');
        })
        .catch(errorHandler);

}