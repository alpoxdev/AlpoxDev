import styled from 'styled-components';
import { Input, Textarea } from 'lib/styles';

export const PostUploadInput = styled.div`
    width : 100%;
    color : #222;
`;

export const TitleInput = styled(Input)`
    margin-bottom : 1rem;

    font-weight : bold;
    font-size : 2rem;
    border : 0;
`;

export const ThumbnailInput = styled(Input)`
    margin-bottom : 1rem;
    
    font-size : 1.2rem;
    border : 0;
    border-bottom : 1px solid #ddd;
`;

export const TagWrapper = styled.div`
    margin-bottom : 1rem;

    display : flex;
    flex-wrap : wrap;
    align-items : center;
`;

export const TagInput = styled(Input)`
    margin-top : ${props=>props.tagsNone === 'true' ? '0' : '0.6rem'};
    font-size : 1.2rem;
    border : 0;
`

export const TagList = styled.div`
    padding : 0 0.75rem;

    display : flex;
    flex-wrap : wrap;
    align-items : center;
`;

export const TagItem = styled.p`
    padding : 0.4rem 0.8rem;
    margin-right : 0.8rem;
    margin-bottom : 0.65rem;

    color : ${props=>props.theme.primaryColor};
    background-color : ${props=>props.theme.subPrimaryColor};
    border-radius : 14px;
    cursor : pointer;

    &:last-child{
        margin-right : 0;
    }
`

export const ContentInput = styled(Textarea)`
    min-height : 50vh;

    font-size : 1.1rem;
    border : 1px solid #ececec;
    border-left : 4px solid ${props=>props.theme.primaryColor};
    border-top-left-radius : 0;
    border-bottom-left-radius : 0;
`;

export const ButtonWrapper = styled.div`
    margin-top : 2.5rem;

    display : flex;
    flex-wrap : wrap;
`

export const UploadButton = styled.button`
    margin-left : auto;
    padding : 0.5rem 0.9rem;
    

    color : white;
    font-size : 1.2rem;
    font-weight : bold;
    background-color : ${props=>props.theme.primaryColor};
    border : none;
    border-radius : 8px;
    outline : none;
    cursor : pointer;
`;

export const Viewer = styled.div`
    width : 100%;
    min-height : calc(100vh - 64px);
    color : white;
`;
