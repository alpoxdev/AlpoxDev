import React from 'react';
import styled from 'styled-components';
import { Header, Text } from 'lib/styles';

export default function TagDetailHeader({ tag }) {
    return (
        <TagDetailHeaderView>
            <TagInfoView>
                <TagName>{tag?.tag}</TagName>
            </TagInfoView>

            <TagInfoView>
                <TagDescription>{tag?.description}</TagDescription>
            </TagInfoView>
        </TagDetailHeaderView>
    );
}

const TagDetailHeaderView = styled.div`
    margin-top: 120px;
    padding-bottom: 2rem;

    display: flex;
    flex-direction: column;
    flex-basis: auto;

    border-bottom: 1px solid #ddd;
`;

const TagInfoView = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const TagName = styled(Header)`
    margin: 0;
    padding: 0.4rem 1.2rem;
    padding-bottom: 0.3rem;

    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1.35;

    color: ${(props) => props.theme.primaryColor};
    background-color: ${(props) => props.theme.subPrimaryColor};

    border-left: 4px solid ${(props) => props.theme.primaryColor};
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
`;

const TagDescription = styled(Text)`
    margin-top: 3.5rem;
`;
