import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styled from 'styled-components';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as tagActions from 'stores/tag';

// components
import { Drawer, Header } from 'components';

const getActive = (path) => {
    const pathLength = path?.length;

    if (pathLength >= 2) {
        // / console.log(path[1]);
        if (path[1] === '' || path[1] === 'posts') {
            return 'Posts';
        }
        if (path[1] === 'tags') {
            return 'Tags';
        }
        if (path[1] === 'about') {
            return 'About';
        }
    }

    return 'Posts';
};

export default function Layout({ children }) {
    const router = useRouter();

    const dispatch = useDispatch();
    const { onGetTags } = bindActionCreators(tagActions, dispatch);

    const { tags } = useSelector((state) => ({
        tags: state.tag.toJS().tags,
    }));
    const { data, pending } = tags;

    React.useEffect(() => {
        if (data?.length === 0 && !pending) onGetTags();
    }, [data]);

    const path = router.pathname.split('/');
    const active = getActive(path);

    return (
        <>
            <Head>
                <meta
                    id="viewport"
                    name="viewport"
                    content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, viewport-fit=cover"
                />
            </Head>

            <LayoutView>
                <Drawer tags={data} active={active} />
                <LayoutContent>
                    <Header />
                    {children}
                </LayoutContent>
            </LayoutView>
        </>
    );
}

const LayoutView = styled.div`
    width: 100%;
    min-height: 100vh;
    background-color: ${(props) => props.theme.backgroundColor};

    overflow-y: scroll;
    overflow-x: hidden;
`;

const LayoutContent = styled.div`
    width: 100%;
    min-height: 100vh;

    margin: 0 auto;
    padding: 1rem;

    position: relative;

    @media (min-width: 992px) {
        width: 960px;
    }

    @media (min-width: 1200px) {
        width: 1140px;
    }
`;
