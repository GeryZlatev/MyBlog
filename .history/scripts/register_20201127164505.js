import { extendContext } from './data.js'

export default function(context) {
    extendContext(context)
        .then(function() {
            this.partial('../templates/register.hbs');
        });
}