const UserModel = firebase.auth();

const app = Sammy('#root', function() {
    this.use('Handlebars', 'hbs');

    //GET

    this.get('#/home', function(context) {
        extendContext(context)
            .then(function() {
                this.partial('../templates/home.hbs');
            });
    });

    this.get('#/register', function(context) {
        extendContext(context)
            .then(function() {
                this.partial('../templates/register.hbs');
            });
    });

    this.get('#/login', function(context) {
        extendContext(context)
            .then(function() {
                this.partial('../templates/login.hbs');
            });
    });

    this.get('#/logout', function(context) {
        UserModel.signOut()
            .then(function() {
                clearUserData();
                this.redirect('#/home');
            })
            .catch(errorHandler);
    });


    //POST

    this.post('#/register', function(context) {
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
    });

    this.post('#/login', function(context) {
        const { email, password } = context.params;
        UserModel.signInWithEmailAndPassword(email, password)
            .then((userData) => {
                saveUserData(userData);
                this.redirect('#/home');
            })
            .catch(errorHandler);

    });



});

app.run('#/home');


function extendContext(context) {
    const user = getUserData();
    context.isLoggedIn = Boolean(user);
    context.userEmail = user ? user.email : '';

    return context.loadPartials({
        header: '../templates/header.hbs',
    });
}

function errorHandler(error) {
    alert(error);
}

function saveUserData(data) {
    const { user: { email, uid } } = data;
    localStorage.setItem('user', JSON.stringify({ email, uid }));
}

function getUserData() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

function clearUserData() {
    window.localStorage.removeItem('user');
}