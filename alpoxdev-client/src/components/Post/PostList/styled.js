import styled, { keyframes } from 'styled-components';
import { Header, Text } from 'lib/styles';

export const PostList = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding-top: 65px;

    @media (min-width: 1520px) {
        padding-top : 100px;
    }
`;

export const PostItem = styled.div`
    width: calc(100% - 30px);
    min-height: 361.89px;
    margin: 15px;
    display: flex;
    flex-direction: column;
    position: relative;

    background-color: white;
    border-radius: 4px;
    cursor: pointer;
    -webkit-box-shadow: 0 10px 7.5px -6px #e6e6e6;
    -moz-box-shadow: 0 10px 7.5px -6px #e6e6e6;
    box-shadow: 0 10px 7.5px -6px #e6e6e6;
    @media (min-width: 768px) {
        width: calc(50% - 30px);
    }
    @media (min-width: 992px) {
        width: calc(50% - 30px);
    }
    @media (min-width: 1200px) {
        width: calc(33% - 30px);
    }
`;

export const PostContent = styled.div`
    flex: auto;

    padding: 1.2rem;
    line-height: 1.35;
    border-top: 0.5px solid transparent;
    border-color: ${(props) => (props.isThumbnail ? '#e3e3e3' : 'transparent')};
    position: ${(props) => (props.isThumbnail === 'true' ? 'static' : 'absolute')};
    top: 0;
    left: 0;
`;

export const Thumbnail = styled.img`
    width: 100%;
    height: auto;
    max-height: 175px;

    object-fit: cover;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
`;

export const TempThumbnail = styled.div`
    width: 100%;
    height: 175px;
`;

export const Title = styled(Text)`
    font-size: 1.3rem;
    font-weight: bold;
    color: ${(props) => props.theme.textBoldColor};

    -webkit-line-clamp: 1;
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
`;

export const Content = styled(Text)`
    margin-top: 0.8rem;
    font-size: 1rem;
    color: ${(props) => props.theme.textColor};
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3; /* number of lines to show */
    -webkit-box-orient: vertical;
`;

export const PostFooter = styled.div`
    width: 100%;
    height: 50px;
    padding-left: 1.2rem;
    padding-right: 1.2rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    position: absolute;
    left: 0;
    bottom: 0;
    border-top: 1px solid rgb(230, 230, 230);
`;

export const UserProfile = styled.img`
    width: 27.5px;
    height: 27.5px;
    border-radius: 50%;
`;

export const Username = styled(Text)`
    margin-top: 2.5px;
    margin-left: 6.7px;
    font-size: 1rem;
`;

export const PostCreatedAt = styled(Text)`
    margin-left: auto;
    margin-top: 1.5px;
    font-size: 0.85rem;
    color: ${(props) => props.theme.textInfoColor};
`;

const loadingFrames = keyframes`
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
`;

export const PostLoading = styled.div`
    width : 100%;
    height : 100px;
    
    display : flex;
    align-items : center;
    justify-content : center;
`;

export const Loading = styled.div`
    font-size: 10px;
    margin: 50px auto;
    text-indent: -9999em;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background: #000;
    background: -moz-linear-gradient(left, #6A63DD 10%, rgba(255, 255, 255, 0) 42%);
    background: -webkit-linear-gradient(left, #6A63DD 10%, rgba(255, 255, 255, 0) 42%);
    background: -o-linear-gradient(left, #6A63DD 10%, rgba(255, 255, 255, 0) 42%);
    background: -ms-linear-gradient(left, #6A63DD 10%, rgba(255, 255, 255, 0) 42%);
    background: linear-gradient(to right, #6A63DD 10%, rgba(255, 255, 255, 0) 42%);
    position: relative;
    -webkit-animation: ${loadingFrames} 1.4s infinite linear;
    animation: ${loadingFrames} 1.4s infinite linear;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);

    &::before{
        width: 50%;
        height: 50%;
        background: #6A63DD;
        border-radius: 100% 0 0 0;
        position: absolute;
        top: 0;
        left: 0;
        content: '';
    }

    &::after{
        background: ${props=>props.theme.backgroundColor};
        width: 75%;
        height: 75%;
        border-radius: 50%;
        content: '';
        margin: auto;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }
`;