import styled from 'styled-components';
import Typed from 'react-typed';
import { Header, Text } from 'lib/styles';

export const AboutProfile = styled.div`
    padding : 0 1rem;
    padding-top : 120px;
`;

export const UserWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 2rem;
`;

export const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 20px;
`;

export const Image = styled.img`
    width: 65px;
    height : auto;
    border-radius: 50%;
`;

export const Nickname = styled(Text)`
    font-family: ${props => props.theme.subPrimaryFont};
    font-weight: bold;
    font-size: 1.25rem;
    
    color: ${props => props.theme.primaryColor};
`;

export const Name = styled(Text)`
    margin-top: 0.45rem;
    line-height : 1.3;
`;

export const Link = styled.a`
    color: ${props => props.theme.primaryColor};
    font-family: ${props => props.theme.subPrimaryFont};
    font-weight: 900;
    text-decoration: none;
    margin-left: 3.5px;
`;

export const Type = styled(Typed)`
    margin-top: 1.5rem;
    font-family: ${props => props.theme.mainEngFont};
    font-size: 1.55rem;
    font-weight: 900;
    font-style: italic;
`;

export const ProjectList = styled.div`
    margin-top: 2rem;
`;

export const ProjectListTitle = styled(Header)`
    font-family: ${props => props.theme.subPrimaryFont};
    font-size: 1.3rem;
    color: #bfbfbf;
    padding-left: 0.6rem;
    margin-bottom: 0.9rem;
`;

export const ProjectItem = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 1.5rem;
    border: 1px solid #e6e6e6;

    &:last-child {
        margin-bottom: 0;
    }
`;

export const ProjectImage = styled.img`
    display: block;
    width: 100px;
    height: 100px;
    border-radius : 5px;
    
    margin : 0.5rem 0;
    margin-left: 1rem;
    object-fit: contain;
`;

export const ProjectInfo = styled.div`
    padding: 1rem;
    width: ${props =>
        props.image === 'image' ? 'calc(100% - 100px - 1rem)' : '100%'};
`;

export const ProjectTitle = styled(Header)`
    font-size: 1.5rem;
    margin-top: 0.35rem;
`;

export const ProjectDescription = styled(Text)`
    margin-top: 1rem;
    font-size: 0.95rem;
    line-height : 1.3;
`;

export const ProjectLink = styled.a`
    font-family: ${props => props.theme.subPrimaryFont};
    font-weight: 900;
    color: ${props => props.theme.primaryColor};
    text-decoration: none;
`;