import styled from 'styled-components';
import { Text } from 'lib/styles';
import ReactGoogleLogin from 'react-google-login';

export const GoogleButtonWrapper = styled.div`

`;

export const GoogleLogin = styled(ReactGoogleLogin)`
    width : 100%;
`;

export const GoogleButton = styled.button`
    width : 100%;
    height : 50px;
    background-color : #fff;

    color : ${props=>props.theme.textColor};
    border : 1px solid #ddd;
    border-radius : 4px;

    cursor : pointer;
`;

export const Divider = styled.div`
    width : 100%;
    margin-top : 2rem;
    margin-bottom : 2rem;
`;

export const DividerText = styled(Text)`
    text-align : center;
    color : rgba(151, 145, 151, 0.8);
`;