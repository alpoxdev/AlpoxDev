// redux
import { wrapper } from 'stores';
import * as postActions from 'stores/post';

export { default } from 'pages/posts';

export const getServerSideProps = wrapper.getServerSideProps(
    async ({ store, req, res, ...etc }) => {
        // console.log(`getServerSideProps`, store.getState());
        const { dispatch, getState } = store;
        await dispatch(postActions.onGetPosts());

        const post = getState()?.post.toJS();

        return {
            props: { post },
        };
    },
);
