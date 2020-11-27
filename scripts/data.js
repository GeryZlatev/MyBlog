export const domElements = {
    infoBox: () => document.querySelector("#infoBox"),
    errorBox: () => document.querySelector("#errorBox"),
}

export function extendContext(context) {
    const user = getUserData();
    context.isLoggedIn = Boolean(user);
    context.userEmail = user ? user.email : '';

    return context.loadPartials({
        header: '../templates/header.hbs',
    });
}

export function errorHandler(error) {
    domElements.errorBox().textContent = error;
    domElements.errorBox().style.display = "block";

    setTimeout(() => {
        domElements.errorBox().textContent = "";
        domElements.errorBox().style.display = "none";
    }, 4000);
}

export function notificatin(message) {
    domElements.infoBox().textContent = message;
    domElements.infoBox().style.display = "block";

    setTimeout(() => {
        domElements.infoBox().textContent = "";
        domElements.infoBox().style.display = "none";
    }, 4000);
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
