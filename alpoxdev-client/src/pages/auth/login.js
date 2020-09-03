import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { wrapper } from 'stores';
import * as loginActions from 'stores/login';

// container
import LoginContainer from 'container/auth/login';

// config
import { ReactHelmet } from 'components';
import { loginHelmet as helmet } from 'config';

function LoginPage() {
    return (
        <>
            <ReactHelmet helmet={helmet} />
            <LoginContainer />
        </>
    );
}

export const getServerSideProps = wrapper.getServerSideProps(({ store, req, res, ...etc }) => {});

export default connect(
    (state) => ({
        state: state.login.toJS(),
    }),
    (dispatch) => ({
        loginActions: bindActionCreators(loginActions, dispatch),
    }),
)(LoginPage);
