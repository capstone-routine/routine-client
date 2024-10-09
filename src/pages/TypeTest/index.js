import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

// 시작할 때 결과 리셋 시켜야함!!!

function TypeTest() {
    const navigate = useNavigate(); 
    const [answers, setAnswers] = useState([]);
    const questions = [
        // Sample questions
        "Question 1: Do you prefer working alone or in a team?",
        "Question 2: Do you enjoy taking risks?",
        // Add more questions as needed
    ];

    const handleAnswer = (questionIndex, answer) => {
        const newAnswers = [...answers];
        newAnswers[questionIndex] = answer;
        setAnswers(newAnswers);
    };

    const handleSubmit = () => {
        // Save answers to local storage or state management
        localStorage.setItem('personalityTestResults', JSON.stringify(answers));
        // Navigate to results page
        navigate('/typetest/result'); // Adjust the path as necessary
    };

    return (
        <Wrap>
            <Wrap_container>
                <h1>Personality Test</h1>
                {questions.map((question, index) => (
                    <div key={index}>
                        <h2>{question}</h2>
                        <button onClick={() => handleAnswer(index, 'Option A')}>Option A</button>
                        <button onClick={() => handleAnswer(index, 'Option B')}>Option B</button>
                    </div>
                ))}
                <button onClick={handleSubmit}>Submit</button>
            </Wrap_container>
        </Wrap>
    );
};

export default TypeTest;

const Wrap = styled.div`
    width: 100%;
    background-size: cover;
    background-position: center center;
`;

const Wrap_container = styled.div`
`;