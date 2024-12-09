import React from "react";
import styled from "styled-components";
import { primaryColor } from '../../styles/colors';
import balancedImage from '../../assets/img/Balanced.png';
import perfectionistImage from '../../assets/img/Perfectionist.png';
import spontaneousImage from '../../assets/img/Spontaneous.png';
import socialImage from '../../assets/img/Social.png';
import emotionalImage from '../../assets/img/Emotional.png';
import goalOrientedImage from '../../assets/img/GoalOriented.png';
import { fontText } from '../../styles/GlobalStyle.js';

const typeImages = {
  "Balanced Type": balancedImage,
  "Perfectionist Type": perfectionistImage,
  "Spontaneous Type": spontaneousImage,
  "Social Type": socialImage,
  "Emotional Type": emotionalImage,
  "Goal-Oriented Type": goalOrientedImage,
};

function ResultComponent({ title, characteristics, routineRecommendations, celebrityExample }) {
  if (!title || !characteristics || !routineRecommendations || !celebrityExample) {
    return <p>Data is missing or incorrect</p>;
  }

  const typeImage = typeImages[title] || null;

  return (
    <Container>
      <Header>{title}</Header>
      {typeImage && <Image src={typeImage} alt={`${title} image`} />}
      <Content>
        <Section>
          <SectionTitle>특징</SectionTitle>
          <List>
            {characteristics.map((char, index) => (
              <ListItem key={index}>
                <Dot />
                <span>{char}</span>
              </ListItem>
            ))}
          </List>
        </Section>
        <Section>
          <SectionTitle>루틴 추천</SectionTitle>
          <List>
            {routineRecommendations.map((rec, index) => (
              <ListItem key={index}>
                <Dot />
                <span>
                  <Bold>{rec.bold}</Bold>: {rec.content}
                </span>
              </ListItem>
            ))}
          </List>
        </Section>
        <Section>
          <SectionTitle>유명인 예시</SectionTitle>
          <NameBox>{celebrityExample.name}</NameBox>
          <Description>
            <Dot />
            <span>{celebrityExample.description}</span>
          </Description>
          <NameBox>루틴</NameBox>
          <List>
            {celebrityExample.routine.map((routine, index) => (
              <ListItem key={index}>
                <Dot />
                <span>
                  <Bold>{routine.bold}</Bold>: {routine.content}
                </span>
              </ListItem>
            ))}
          </List>
        </Section>
      </Content>
    </Container>
  );
}

export default ResultComponent;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 680px;
  margin: 20px auto;
  padding-bottom: 70px;
  border: 1.5px solid ${primaryColor};
  border-radius: 80px;
  background-color: #ffffff;
`;

const Header = styled.h1`
  font-size: 1.8em;
  font-weight: bold;
  text-align: center;
  background-color: ${primaryColor};
  color: white;
  margin-top: 70px;
  padding: 10px 0;
  margin-bottom: 30px;
  width: 100%;
  padding: 15px;
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
  margin-bottom: 20px;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 500px;
`;

const Section = styled.div`
  width: 100%;
`;

const SectionTitle = styled.h2`
  font-size: 15px;
  background-color: ${primaryColor};
  color: white;
  width: 100px;
  height: 30px;
  text-align: center;
  border-radius: 9px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  font-weight: 300;
  margin-bottom: 5px;
  font-family: 'ChosunSg';
`;

const Dot = styled.div`
  width: 5px;
  height: 5px;
  flex-shrink: 0; /* 크기가 축소되지 않도록 설정 */
  flex-grow: 0; /* 크기가 확장되지 않도록 설정 */
  flex-basis: auto; /* 기본 크기를 명시적으로 설정 */
  background-color: black;
  border-radius: 50%;
  margin-right: 10px;
`;

const NameBox = styled.div`
  background-color: black;
  color: white;
  padding: 5px 5px 5px 10px;
  margin-bottom: 10px;
  border-radius: 2px;
  font-size: 1.4rem;
`;

const Description = styled.div`
  background-color: #f9f9f9;
  color: black;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  text-align: left;
  display: flex;
  align-items: center;
  font-family: 'ChosunSg';
`;

const Bold = styled.span`
  font-family: "SCDream";
  font-weight: 500;
`;