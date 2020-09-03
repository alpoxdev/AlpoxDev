import styled from 'styled-components';
import { Header, Text, Input as Input1, Button } from 'lib/styles';

export const UserDefault = styled.div`
    padding : 0 10px;
`;

export const TopWrapper = styled.div`
    display : flex;
    align-items : center;
`;

export const Title = styled(Header)`
    padding : 0.35rem 0.45rem;

    background-color : ${props=>props.theme.subPrimaryColor};
    font-size : 1.55rem;
    border-left : 3.5px solid ${props=>props.theme.primaryColor};
    border-top-right-radius : 6px;
    border-bottom-right-radius : 6px;
`;

export const ChangeButton = styled(Button)`
    margin-left : auto;
    padding : 0.65rem 0.9rem;

    opacity : ${props=>props.isChange ? '1' : '0.5'};
`;

export const InfoWrapper = styled.div`
    margin-top : 30px;
`;

export const Label = styled(Text)`
    margin-bottom : 8px;
    margin-left : 5px;
`;

export const ProfileWrapper = styled.div`

`;

export const Input = styled(Input1)`

`;

export const Nickname = styled(Input)`

`;

export const Email = styled(Input)`

`;


// Dropzone

export const Dropzone = styled.div`
    width : 100%;

    display : flex;
    flex-wrap : wrap;
`;

export const DropzoneInput = styled.input`
    display : none;
`;

export const DropzoneProfile = styled.img`
    width : 200px;
    height : 200px;
    
    border : 1px solid #ddd;
    border-radius : 14px;
`;

export const DropzoneInfo = styled.div`
    margin-left : auto;

    display : flex;
    flex-direction : column;
`;

export const DropzonePreview = styled.img`
    width : 120px;
    height : 120px;
    display : block;
    margin : 0 auto;
    
    border-radius : 50%;
`;

export const DropzoneInfoText = styled(Text)`
    margin-top : auto;
    text-align : center;
`;