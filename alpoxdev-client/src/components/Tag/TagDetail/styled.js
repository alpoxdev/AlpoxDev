import styled from 'styled-components';
import { Header, Text } from 'lib/styles';

export const TagDetailHeader = styled.div`
    margin-top : 100px;
    margin-bottom: 3rem;
    padding-bottom: 2rem;
    display: flex;
    flex-direction: column;
    flex-basis: auto;
    border-bottom: 1px solid #ddd;
`;

export const TagName = styled(Header)`
    margin: 0;
    padding: 0.5rem 1rem;

    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1.35;

    color: ${props => props.theme.primaryColor};
    background-color: ${props => props.theme.subPrimaryColor};
    border-left: 4px solid ${props => props.theme.primaryColor};
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
`;

export const TagDescription = styled(Text)`
    margin-top : 3.5rem;
`;