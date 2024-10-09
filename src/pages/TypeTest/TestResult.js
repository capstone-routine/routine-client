import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

function TestResult(){
    const [results, setResults] = useState([]);

    useEffect(() => {
        // Retrieve saved results from local storage
        const savedResults = localStorage.getItem('personalityTestResults');
        if (savedResults) {
            setResults(JSON.parse(savedResults));
        }
    }, []);

    const calculateResult = (answers) => {
        // Logic to calculate results based on answers
        // This is a placeholder; implement your own logic
        if (answers.length === 0) return "No results to show.";
        return `Your personality type is: ${answers.join(', ')}`;
    };

    return (
        <Wrap>
            <Wrap_container>
                <h1>Test Results</h1>
                <p>{calculateResult(results)}</p>
                {/* You can also add additional information or visuals based on results */}
            </Wrap_container>
        </Wrap>
    );
};

export default TestResult;

const Wrap = styled.div`
    width: 100%;
    background-size: cover;
    background-position: center center;
`;

const Wrap_container = styled.div`

`;