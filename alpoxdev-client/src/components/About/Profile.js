import React from 'react';
import * as styled from './styled';

const IMAGE_URL =
    'https://avatars3.githubusercontent.com/u/29870990?s=460&u=bde5b12a47ecd77ce841d36259cea697edad3f6a&v=4';

export default function AboutProfile(props) {
    return (
        <styled.AboutProfile>
            <styled.UserWrapper>
                <styled.Image src={IMAGE_URL} alt="profile" />
                <styled.UserInfo>
                    <styled.Nickname>AlpoxDev</styled.Nickname>
                    <styled.Name>
                        양민열, 건국대학교 컴퓨터공학과
                        <br />
                        instagram
                        <styled.Link
                            href="https://www.instagram.com/alpox.dev/"
                            target="_blank"
                        >
                            @alpox.dev
                        </styled.Link>
                    </styled.Name>
                </styled.UserInfo>
            </styled.UserWrapper>

            <styled.Type
                strings={[
                    "IT's ME. Alpox.",
                    'Front-End, Back-End, Application Engineer',
                    'Will be CTO. Keep it simple, Stupid.'
                ]}
                typeSpeed={50}
                backSpeed={40}
                backDelay={2000}
                loop={true}
            />
        </styled.AboutProfile>
    );
}
