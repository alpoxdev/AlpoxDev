import styled from 'styled-components';
import { Text } from 'lib/styles';

export const RegisterFooter = styled.div`

`;

export const LoginButton = styled(Text)`
    width : 100%;
    margin-top : 15px;

    color : ${props=>props.theme.textInfoColor};
    text-align : center;
    cursor : pointer;
`;