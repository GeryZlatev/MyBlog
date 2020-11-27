import { DB, notificatin, errorHandler} from './data.js';

export default function(context) {
    const { postId } = context.params;
    DB.collection('posts')
        .doc(postId)
        .delete()
        .then(() => {
            let message = 'You successfully deleted the post'
            notificatin(message)
            this.redirect('#/home');
        })
        .catch(errorHandler);
}