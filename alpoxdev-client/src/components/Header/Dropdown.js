import React from 'react';
import Link from 'next/link';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from 'stores/user';
import * as uiActions from 'stores/ui';
import * as styled from './styled';

function Dropdown({ userState, userActions, uiState, uiActions }) {
    const {
        header: { dropdown },
    } = uiState;
    const { onLogout } = userActions;
    const { setDropdown } = uiActions;

    if (!dropdown) return null;

    return (
        <styled.Dropdown>
            <Link href="/user">
                <styled.DropdownItem onClick={() => setDropdown(!dropdown)}>
                    <styled.DropdownItemText>
                        내 정보 수정
                    </styled.DropdownItemText>
                </styled.DropdownItem>
            </Link>
            <styled.DropdownItem
                onClick={() => {
                    onLogout();
                    setDropdown(!dropdown);
                }}
            >
                <styled.DropdownItemText>로그아웃</styled.DropdownItemText>
            </styled.DropdownItem>
        </styled.Dropdown>
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
)(Dropdown);
