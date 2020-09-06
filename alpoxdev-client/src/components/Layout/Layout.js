import React from 'react';
import Head from 'next/head';
import * as styled from './styled';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'stores/user';

// components
import { Header, Drawer } from 'components';

// utils
import { parseRefreshTimestamp } from 'lib/utils';

function Layout({ children, tagState, uiState, userState, userActions }) {
    const { tags : { tags }} = tagState;
    const { drawer : { active }} = uiState;
    const { accessToken, refreshToken, loginTime } = userState;

    React.useEffect(()=>{
        console.log(loginTime);
        const isRefresh = parseRefreshTimestamp(loginTime);

        if(accessToken && refreshToken && isRefresh){
            userActions.onRefresh();
        }
    }, []);

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
        uiState: state.ui.toJS(),
        userState : state.user.toJS()
    }),
    (dispatch) => ({
        userActions : bindActionCreators(userActions, dispatch)
    })
)(Layout);
