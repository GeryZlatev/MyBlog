import { DB, extendContext } from './data.js';

export default function(context) {
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
}