import createPost from './createPost.js';
import deletePost from './deletePost.js';
import details from './details.js';
import editPost, { edit } from './editPost.js';
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

    this.post('#/create-post', createPost)

    this.post('#/edit-post/:postId', edit);
});

app.run('#/home');