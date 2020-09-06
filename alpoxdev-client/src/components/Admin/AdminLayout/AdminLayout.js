import React from 'react';
import styled from 'styled-components';

// redux
import { connect } from 'react-redux';

function AdminLayout({ children }){
    return(
        <AdminLayoutWrapper>
            {children}
        </AdminLayoutWrapper>
    )
}

const AdminLayoutWrapper = styled.div`
    width : 100%;
    min-height : 100vh;

    position : absolute;
    top : 0;
    left : 0;
    z-index : 3;
`;

export default connect(
    (state) => ({
        userState: state.user?.toJS()
    }),
    null
)(AdminLayout);