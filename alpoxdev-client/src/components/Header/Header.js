import React, { useState } from 'react';
import Link from 'next/link';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from 'stores/user';
import * as uiActions from 'stores/ui';
import * as styled from './styled';

// components
import Profile from './Profile';
import Dropdown from './Dropdown';

function Header({ userState, uiState, uiActions }) {
    const { user } = userState;
    const {
        header: { dropdown },
    } = uiState;
    const { setDropdown } = uiActions;

    return (
        <styled.HeaderWrapper>
            <styled.Header>
                <styled.LeftWrapper>
                    <Link href="/">
                        <styled.Logo>TAPMATH</styled.Logo>
                    </Link>
                </styled.LeftWrapper>
                <styled.RightWrapper>
                    {user && (
                        <Profile
                            user={user}
                            onClick={() => setDropdown(!dropdown)}
                        />
                    )}
                    {!user && (
                        <styled.AuthTap>
                            <Link href="/auth">
                                <styled.LoginButton>로그인</styled.LoginButton>
                            </Link>
                            <Link href="/auth/register">
                                <styled.RegisterButton>
                                    회원가입
                                </styled.RegisterButton>
                            </Link>
                        </styled.AuthTap>
                    )}
                </styled.RightWrapper>
            </styled.Header>
            {dropdown && <Dropdown onClick={() => setDropdown(!dropdown)} />}
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
