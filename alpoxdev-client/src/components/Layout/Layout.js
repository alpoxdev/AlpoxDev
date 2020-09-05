import React from 'react';
import Head from 'next/head';
import * as styled from './styled';

// redux
import { connect } from 'react-redux';

import { Header, Drawer } from 'components';

function Layout({ children, tagState, uiState }) {
    const { tags : { tags }} = tagState;
    const { drawer : { active }} = uiState;
    console.log(tags.slice(0, 5));

    return (
        <>
            <Head>
                <meta
                    id="viewport"
                    name="viewport"
                    content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, viewport-fit=cover"
                />
            </Head>

            <styled.LayoutWrapper>
                <Header/>
                <Drawer tags={tags} active={active}/>
                <styled.Layout>{children}</styled.Layout>
            </styled.LayoutWrapper>
        </>
    );
}

export default connect(
    (state) => ({
        tagState: state.tag.toJS(),
        uiState: state.ui.toJS()
    }),
    (dispatch) => ({

    })
)(Layout);
