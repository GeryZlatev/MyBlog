const UserModel = firebase.auth();
const DB = firebase.firestore();
const app = Sammy('#root', function() {
    this.use('Handlebars', 'hbs');

    //GET

    this.get('#/home', function(context) {
        DB.collection('posts')
            .get()
            .then((response) => {
                context.posts = response
                    .docs
                    .map((post) => {
                        return { id: post.id, ...post.data() }
                    });
                extendContext(context)
                    .then(function() {
                        this.partial('../templates/home.hbs');
                    });
            })
            .catch(errorHandler);

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
            .then((response) => {
                clearUserData();
                this.redirect('#/home');
            })
            .catch(errorHandler);
    });

    this.get('#/details/:postId', function(context) {
        const { postId } = context.params;
        DB.collection('posts')
            .doc(postId)
            .get()
            .then((response) => {
                const currentPostData = response.data();
                context.post = {...currentPostData };
                extendContext(context)
                    .then(function() {
                        this.partial('../templates/details.hbs');
                    });
            })
    })

    this.get('#/edit-post/:postId', function(context) {
            const { postId } = context.params;
            DB.collection('posts')
                .doc(postId)
                .get()
                .then((response) => {
                    context.post = { id: postId, ...response.data() }
                    extendContext(context)
                        .then(function() {
                            this.partial('../templates/editPost.hbs');
                        })
                })
        })
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

    this.post('#/create-post', function(context) {
        const { title, category, content } = context.params;
        DB.collection('posts').add({
                title,
                category,
                content,
                creator: getUserData().uid,
            })
            .then((createdPost) => {
                console.log(createdPost);
                this.redirect('#/home');
            })
            .catch(errorHandler);
    })

    this.post('#/edit-post/:postId', function(context) {
        const { postId, title, category, content } = context.params;

        DB.collection('posts')
            .doc(postId)
            .get()
            .then((response) => {
                return DB.collection('posts')
                    .doc(postId)
                    .set({
                        ...response.data(),
                        title,
                        category,
                        content
                    })
            })
            .then((response) => {
                this.redirect(`#/home`);
            })
            .catch(errorHandler);
    })
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