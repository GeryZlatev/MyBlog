import { DB, extendContext, errorHandler, notificatin } from './data.js';

export default function(context) {
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

}

export function edit(context) {
    const { postId, title, category, content} = context.params;

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
            let message = 'You are successfully edited the post!';
            notificatin(message);
            this.redirect('#/home');
        })
        .catch(errorHandler);
}