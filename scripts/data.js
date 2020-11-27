export function extendContext(context) {
    const user = getUserData();
    context.isLoggedIn = Boolean(user);
    context.userEmail = user ? user.email : '';

    return context.loadPartials({
        header: '../templates/header.hbs',
    });
}

export function errorHandler(error) {
    alert(error);
}

export function saveUserData(data) {
    const { user: { email, uid } } = data;
    localStorage.setItem('user', JSON.stringify({ email, uid }));
}

export function getUserData() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

export function clearUserData() {
    window.localStorage.removeItem('user');
}

export const UserModel = firebase.auth();
export const DB = firebase.firestore();