import { mergeData } from 'vue-functional-data-merge';

export default {
    name: 'backend-footer',

    functional: true,

    props: {
        tag: {
            type: String,
            default: 'footer',
        }
    },

    render (h, { data, props, slots }) {
        const hasLinks = !! slots().links;

        let links = h(false);
        if (hasLinks) {
            links = h(
                'ul',
                {
                    staticClass: 'navbar-nav'
                },
                [slots().links]
            );
        }

        return h(
            props.tag,
            {
                staticClass: 'footer',
                class: {
                    'd-flex': hasLinks,
                    'justify-content-between': hasLinks
                }
            },
            [slots().default, links]
        );
    },
};