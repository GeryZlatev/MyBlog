import { UserModel, clearUserData, errorHandler } from './data.js';

export default function(context) {
    UserModel.signOut()
        .then((response) => {
            clearUserData();
            this.redirect('#/home');
        })
        .catch(errorHandler);
}