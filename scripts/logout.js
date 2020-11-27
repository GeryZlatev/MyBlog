import { UserModel, clearUserData, errorHandler, notificatin } from './data.js';

export default function(context) {
    UserModel.signOut()
        .then((response) => {
            clearUserData();
            let message = 'You are successfully logout! We are looking for to see you again!';
            notificatin(message);
            this.redirect('#/home');
        })
        .catch(errorHandler);
}