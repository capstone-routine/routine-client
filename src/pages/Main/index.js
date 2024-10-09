import React from "react";
import { useNavigation } from "../../hooks/navigation";

import styled from "styled-components";
import { primaryColor, secondaryColor, textColor } from '../../styles/colors'; // Consider removing .js
import backgroundImage from "../../assets/img/mainBackground.png";

function Main() {
    const { goToTestDetail } = useNavigation();

    return (
        <>
            <Intro>
                <Wrap>
                    <Title>
                        <TitleName1>APTITUDE</TitleName1>
                        <br/>
                        <TitleName2>TEST</TitleName2>
                    </Title>
                    <Description>
                        효과적인 일정 관리의 시작, 나의 적성 파악하기!
                    </Description>
                    <StartButton onClick={goToTestDetail}>Test 시작하기</StartButton>
                </Wrap>
            </Intro>
        </>
    );
};

export default Main;

const Intro = styled.div`
    width: 100%;
    height: 650px;
    background-image: url(${backgroundImage});
    background-size: cover;
    background-position: center center;
`;

const Wrap = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 1280px;
    height: 100%;
    margin: 0 auto;

    ${Intro} > & {
        flex-direction: column;
        justify-content: center;
    }
`;

const Title = styled.p`
    margin-top: -50px;
    font-size: 10rem;
    color: ${textColor};
`;

const TitleName1 = styled.span`
    font-family: 'SoukouMincho';
    color: ${secondaryColor};
    -webkit-text-stroke: 1.5px black; 
    text-shadow: none;
`;

const TitleName2 = styled.span`
    font-family: 'SoukouMincho';
    
`;

const Description = styled.p`
    font-size: 2rem;
    font-weight: 500;
    color: #40546d;
    margin-bottom: 50px;
    padding: 0 20px;
`;

const StartButton = styled.button`
    width: 250px;
    font-size: 2.0rem;
    font-weight: 500;
    color: #fff;
    background-color: ${primaryColor};
    border-radius: 25px;
    padding: 10px 25px;
`;
