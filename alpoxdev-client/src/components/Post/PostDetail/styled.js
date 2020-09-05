import styled from 'styled-components';
import { Header, Text } from 'lib/styles';

/*
    Header
*/

export const PostDetailHeader = styled.div`
    padding-top : 100px;
`;

/*
    Header - Top
*/

export const HeaderTopWrapper = styled.div`
    
`;

export const HeaderTitle = styled(Header)`
    width : 100%;
    font-size : 2rem;
    
`;

/*
    Header - Bottom
*/

export const HeaderBottomWrapper = styled.div`
    width : 100%;
    display : flex;
    flex-wrap : wrap;
    align-items : center;
    margin-top : 1.2rem;
`;

export const UserProfile = styled.img`
    width : 35px;
    height : 35px;
    border-radius : 50%;
`;

export const Username = styled(Text)`
    margin-left : ${props=>props.isThumbnail === 'true' ? '10px' : '0'};
    font-size : 1.2rem;
`;

export const PostCreatedAt = styled(Text)`
    margin-top : 3px;
    margin-left : 10px;
    font-size : 1rem;
    color : #999;
`;

export const PostDetailTagList = styled.div`
    margin-top : 1rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
`;

export const PostDetailTagItem = styled(Text)`
    margin-top: 0.65rem;
    margin-right: 0.8rem;
    padding: 0.4rem 0.8rem;
    color: ${props => props.theme.primaryColor};
    background-color: ${props => props.theme.subPrimaryColor};
    font-size: 0.8rem;
    font-weight: bold;
    border-radius: 14px;
    cursor: pointer;
    &:last-child {
        margin-right: 0;
    }
`;

/*
    Content
*/

export const PostDetailContent = styled.div`
    margin-top : 4rem;
    & > pre{
        margin-top : 1.8rem !important;
        margin-bottom : 1rem !important;
        font-size : 0.8rem !important;
        border : 1px solid ${props=>props.theme.textInfoColor};
        border-left : 4px solid ${props=>props.theme.primaryColor};
    }
    & > h1{
        font-size : 2.2rem !important;
    }
    & > h2{
        font-size : 2rem !important;
    }
    & > h3{
        font-size : 1.8rem !important;
    }
    & > h4{
        font-size : 1.6rem !important;
    }
    & > h5{
        font-size : 1.4rem !important;
    }
    & > p{
        font-size : 0.95rem !important;
    }
`;

/*
    disqus
*/

export const DisqusWrapper = styled.div`
    margin-top : 5rem;
`;