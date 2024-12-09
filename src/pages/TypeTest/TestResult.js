import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { primaryColor } from '../../styles/colors';
import balancedImage from '../../assets/img/Balanced.png';
import perfectionistImage from '../../assets/img/Perfectionist.png';
import spontaneousImage from '../../assets/img/Spontaneous.png';
import socialImage from '../../assets/img/Social.png';
import emotionalImage from '../../assets/img/Emotional.png';
import goalOrientedImage from '../../assets/img/GoalOriented.png';
import backgroundImage from "../../assets/img/testBackground.png";

const API_BASE_URL = process.env.REACT_APP_API_URL;

function TestResult() {
    const [results, setResults] = useState({});
    const [highestType, setHighestType] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch stored test results from localStorage
        const savedResults = localStorage.getItem('personalityTestResults');
        if (savedResults) {
            const parsedResults = JSON.parse(savedResults);
            const calculatedResults = calculateResults(parsedResults);
            setResults(calculatedResults);

            // Determine the type with the highest score
            const determinedType = determineHighestType(calculatedResults);
            setHighestType(determinedType);

            // Send the result to backend
            axios.post(`${API_BASE_URL}/Usertype`, { type: determinedType }, { withCredentials: true })
                .then(response => console.log('Results saved:', response.data))
                .catch(error => console.error('Error saving results:', error));
        }
    }, []);

    const calculateResults = (scores) => {
        const aggregatedScores = {};
        for (const [type, scoresList] of Object.entries(scores)) {
            const totalScore = scoresList.reduce((sum, score) => sum + score, 0);
            aggregatedScores[type] = {
                total: totalScore,
                count5: scoresList.filter(score => score === 5).length,
                count4: scoresList.filter(score => score === 4).length
            };
        }
        return aggregatedScores;
    };

    const determineHighestType = (results) => {
        // Sort by total score, then by count of 5s, then by count of 4s
        const sortedTypes = Object.entries(results).sort(([, a], [, b]) => {
            if (b.total !== a.total) return b.total - a.total;
            if (b.count5 !== a.count5) return b.count5 - a.count5;
            return b.count4 - a.count4;
        });
        return sortedTypes.length > 0 ? sortedTypes[0][0] : 'No matching type';
    };

    const handleResultClick = () => {
        const typePageMap = {
            'Balanced Type': '/typetest/result1',
            'Perfectionist': '/typetest/result2',
            'Spontaneous Type': '/typetest/result3',
            'Social Type': '/typetest/result4',
            'Emotional Type': '/typetest/result5',
            'Goal-Oriented Type': '/typetest/result6'
        };

        if (typePageMap[highestType]) {
            navigate(typePageMap[highestType]);
        }
    };

    const getImageForType = (type) => {
        const images = {
            'Balanced Type': balancedImage,
            'Perfectionist': perfectionistImage,
            'Spontaneous Type': spontaneousImage,
            'Social Type': socialImage,
            'Emotional Type': emotionalImage,
            'Goal-Oriented Type': goalOrientedImage
        };
        return images[type] || null;
    };

    return (
        <Wrap>
            <WrapContainer onClick={handleResultClick}>
                {highestType ? (
                    <ResultContent>
                        <ResultBox>{highestType}</ResultBox>
                        <ResultImage src={getImageForType(highestType)} alt={highestType} />
                    </ResultContent>
                ) : (
                    <p>No results found. Please retake the quiz.</p>
                )}
            </WrapContainer>
        </Wrap>
    );
}

export default TestResult;

const Wrap = styled.div`
    width: 100%;
    background-size: cover;
    background-position: center center;
    height: 600px;
    background-image: url(${backgroundImage});
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding-top: 20px;
`;

const WrapContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 700px;
    min-height: 200px;
    background-color: white;
    border-radius: 15px;
    border: 2px solid #FBE0D1;
    padding: 20px;
    cursor: pointer;
    transition: transform 0.2s;
    margin-top: 100px;

    &:hover {
        transform: scale(1.02);
    }
`;

const ResultContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;

const ResultBox = styled.div`
    background-color: ${primaryColor};
    color: white;
    padding: 20px;
    border-radius: 1px;
    font-weight: bold;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 250px;
    height: 55px;
    margin-right: 200px; /* 오른쪽 간격 */
`;

const ResultImage = styled.img`
    width: 150px;
    height: 150px;
    object-fit: contain;
    margin-left: -100px;
`;
