import styled from 'styled-components';
import { Header as Header1, Text } from 'lib/styles';

export const HeaderWrapper = styled.div`
    width: 100%;
    height: 64px;

    position: fixed;
    top: 0;

    background-color: #fff;
    box-shadow: rgb(230, 230, 230) 0px 10px 7.5px -6px;
`;

export const Header = styled.div`
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 0 30px;

    display: flex;
    flex-wrap: wrap;
    align-items: center;

    @media (min-width: 768px) {
        width: 720px;
    }

    @media (min-width: 1200px) {
        width: 1140px;
    }
`;

export const LeftWrapper = styled.div``;

export const Logo = styled(Header1)`
    cursor: pointer;
`;

export const RightWrapper = styled.div`
    margin-left: auto;

    display: flex;
    flex-wrap: wrap;
    align-items: center;
`;

export const AuthTap = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
`;

export const LoginButton = styled(Text)`
    margin-right: 15px;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;

export const RegisterButton = styled(Text)`
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;

export const Profile = styled.div``;

export const ProfileImage = styled.img`
    width: 35px;
    height: 35px;
    border-radius: 50%;

    margin-top: 3.5px;
    cursor: pointer;
`;

export const DropdownButton = styled.img``;

export const Dropdown = styled.div`
    width: 150px;

    position: absolute;
    top: 64px;
    right: 0;
    z-index: 2;

    border-radius: 4px;
    background-color: #fff;

    @media (min-width: 768px) {
        right: calc(50% - 330px);
    }

    @media (min-width: 1200px) {
        right: calc(50% - 550px);
    }
`;

export const DropdownItem = styled.div`
    width: 100%;
    padding: 12px 18px;

    border-top: 1px solid #eee;
    cursor: pointer;
`;

export const DropdownItemText = styled(Text)``;
