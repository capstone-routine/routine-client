import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import userTypeData from '../../assets/data/userType.json';
import styled from 'styled-components';
import axios from 'axios';
import { primaryColor } from '../../styles/colors';
import backgroundImage from "../../assets/img/testBackground.png";

function TypeTest() {
    const navigate = useNavigate();
    const [scores, setScores] = useState({});
    const [currentTypeIndex, setCurrentTypeIndex] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedScore, setSelectedScore] = useState(null);

    const handleAnswer = (typeName, score) => {
        setSelectedScore(score);
    };

    const handleNextQuestion = () => {
        if (selectedScore === null) {
            alert('점수를 선택해주세요.');
            return;
        }

        const newScores = { ...scores };
        const typeName = userTypeData.types[currentTypeIndex].name;
        if (!newScores[typeName]) {
            newScores[typeName] = [];
        }
        newScores[typeName][currentQuestionIndex] = selectedScore;
        setScores(newScores);

        setSelectedScore(null);

        const nextQuestionIndex = currentQuestionIndex + 1;
        if (nextQuestionIndex < userTypeData.types[currentTypeIndex].questions.length) {
            setCurrentQuestionIndex(nextQuestionIndex);
        } else {
            const nextTypeIndex = currentTypeIndex + 1;
            if (nextTypeIndex < userTypeData.types.length) {
                setCurrentTypeIndex(nextTypeIndex);
                setCurrentQuestionIndex(0);
            } else {
                localStorage.setItem('personalityTestResults', JSON.stringify(newScores));
                navigate('/typetest/result');
            }
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        } else if (currentTypeIndex > 0) {
            const prevTypeIndex = currentTypeIndex - 1;
            const prevQuestionIndex = userTypeData.types[prevTypeIndex].questions.length - 1;
            setCurrentTypeIndex(prevTypeIndex);
            setCurrentQuestionIndex(prevQuestionIndex);
        }

        const previousTypeName = userTypeData.types[currentTypeIndex].name;
        const previousScore = scores[previousTypeName]?.[currentQuestionIndex - 1] || null;
        setSelectedScore(previousScore);
    };

    const currentType = userTypeData.types[currentTypeIndex];
    const currentQuestion = currentType.questions[currentQuestionIndex];

    const renderScoreButtons = () => {
        const scores = [1, 2, 3, 4, 5];
        return scores.map(score => (
            <CircleButton
                key={score}
                onClick={() => handleAnswer(currentType.name, score)}
                isSelected={selectedScore === score}
            >
                {score}
            </CircleButton>
        ));
    };

    return (
        <Wrap>
            <QuestionBox>
                {currentQuestion && (
                    <>
                        <p>
                            <strong>{currentQuestion.a}</strong>
                        </p>
                        <LabelContainer>
                            <Label>그렇지 않다</Label>
                            <Label>매우 그렇다</Label>
                        </LabelContainer>
                        <ButtonContainer>{renderScoreButtons()}</ButtonContainer>
                    </>
                )}
                <NavigationContainer>
                    <NavButton onClick={handlePreviousQuestion}>←</NavButton>
                    <NavButton onClick={handleNextQuestion}>→</NavButton>
                </NavigationContainer>
            </QuestionBox>
        </Wrap>
    );
}

export default TypeTest;

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 700px;;
    background-image: url(${backgroundImage});
    background-size: cover;
    background-position: center center;
`;

const QuestionBox = styled.div`
    background-color: white;
    padding: 50px;
    border-radius: 15px;
    text-align: center;
    max-width: 700px;
    width: 100%;
    border: 2px solid #FBE0D1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 400px;

    p {
        font-weight: bold;
        font-size: 18px;
        text-align: center;
        margin-top: 20px;
    }
`;

const LabelContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 100px;
    max-width: 300px;
`;

const Label = styled.span`
    font-size: 12px;
    color: #666;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 300px;
    margin-bottom: 60px;
`;

const CircleButton = styled.button`
    background-color: ${props => (props.isSelected ? 'white' : primaryColor)};
    color: ${props => (props.isSelected ? primaryColor : 'white')};
    border-radius: 50%;
    width: 50px;
    height: 50px;
    border: 2px solid ${primaryColor};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;

    &:hover {
        transform: scale(1.1);
    }

    &:active {
        transform: scale(0.9);
    }
`;

const NavigationContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: -20px;
`;

const NavButton = styled.button`
    background-color: white;
    color: ${primaryColor};
    border: 2px solid ${primaryColor};
    border-radius: 8px;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
        background-color: ${primaryColor};
        color: white;
    }
`;