import { DB, getUserData, errorHandler, notificatin } from './data.js';

export default function(context) {
    const { title, category, content } = context.params;
    DB.collection('posts').add({
            title,
            category,
            content,
            creator: getUserData().uid,
        })
        .then((createdPost) => {
            let message = 'You successfully created a new post';
            notificatin(message);
            this.redirect('#/home');
        })
        .catch(errorHandler);
}