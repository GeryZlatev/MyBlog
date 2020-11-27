import { extendContext, DB, errorHandler } from './data.js';


export default function(context) {
    DB.collection('posts')
        .get()
        .then((response) => {
            context.posts = response
                .docs
                .map((post) => {
                    return { id: post.id, ...post.data() }
                });
            extendContext(context)
                .then(function() {
                    this.partial('../templates/home.hbs');
                });
        })
        .catch(errorHandler);

}