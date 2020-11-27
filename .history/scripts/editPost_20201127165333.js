import { DB, extendContext } from './data.js';

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