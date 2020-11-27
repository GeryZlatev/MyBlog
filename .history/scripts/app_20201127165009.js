import home from './home.js'
import login from './login.js';
import logout from './logout.js';
import register from './register.js';

const app = Sammy('#root', function() {
    this.use('Handlebars', 'hbs');

    //GET

    this.get('#/home', home);

    this.get('#/register', register);

    this.get('#/login', login);

    this.get('#/logout', logout);

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

    });

    this.get('#/delete/:postId', function(context) {
            const { postId } = context.params;
            DB.collection('posts')
                .doc(postId)
                .delete()
                .then(() => {
                    this.redirect('#/home');
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

    this.post('#/login', loginUser);

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
                this.redirect('#/home');
            })
            .catch(errorHandler);
    });
});

app.run('#/home');