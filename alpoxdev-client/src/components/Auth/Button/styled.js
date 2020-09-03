import styled from 'styled-components';
import { Button } from 'lib/styles';

export const AuthButton = styled(Button)`
    margin-top : 25px;

    color : ${props=>props.action === 'action' ? props.theme.primaryColor : '#fff'};
    background-color : ${props=>props.action === 'action' ? '#fff' : props.theme.primaryColor};
    border : 1px solid ${props=>props.theme.primaryColor};
`;