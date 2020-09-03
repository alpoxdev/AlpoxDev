import React from 'react';
import { wrapper } from 'stores';

// container
import IndexContainer from 'container/index';

import { ReactHelmet } from 'components';
import { defaultHelmet as helmet } from 'config';

// dev
const dev = process.env.NODE_ENV === 'development';

export default function IndexPage() {
    return (
        <>
            <ReactHelmet helmet={helmet} />
            <IndexContainer />
        </>
    );
}

export const getServerSideProps = wrapper.getServerSideProps(({ store, req, res, ...etc }) => {});
