import React, { useState } from 'react';
import Link from 'next/link';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from 'stores/user';
import * as uiActions from 'stores/ui';
import * as styled from './styled';

// styles
import { useScrollFadeIn } from 'lib/hooks';

function Header() {
    const scrollFadIn = useScrollFadeIn();

    return (    
        <styled.HeaderWrapper {...scrollFadIn}>
            <styled.Header>
                <styled.HeaderLogo>
                    AlpoxDev
                </styled.HeaderLogo>
            </styled.Header>
        </styled.HeaderWrapper>
    );
}

export default connect(
    (state) => ({
        userState: state.user.toJS(),
        uiState: state.ui.toJS(),
    }),
    (dispatch) => ({
        userActions: bindActionCreators(userActions, dispatch),
        uiActions: bindActionCreators(uiActions, dispatch),
    }),
)(Header);
