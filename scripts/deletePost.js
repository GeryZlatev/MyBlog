import { DB } from './data.js';

export default function(context) {
    const { postId } = context.params;
    DB.collection('posts')
        .doc(postId)
        .delete()
        .then(() => {
            this.redirect('#/home');
        })
}