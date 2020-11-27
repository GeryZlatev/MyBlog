import { DB, getUserData, errorHandler } from './data.js';

export default function(context) {
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
}