import deletePost from './deletePost.js';
import details from './details.js';
import editPost from './editPost.js';
import home from './home.js'
import login, { loginUser } from './login.js';
import logout from './logout.js';
import register, { registerUser } from './register.js';

const app = Sammy('#root', function() {
    this.use('Handlebars', 'hbs');

    //GET

    this.get('#/home', home);

    this.get('#/register', register);

    this.get('#/login', login);

    this.get('#/logout', logout);

    this.get('#/details/:postId', details);

    this.get('#/edit-post/:postId', editPost);

    this.get('#/delete/:postId', deletePost)
        //POST

    this.post('#/register', registerUser);

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