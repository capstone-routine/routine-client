import React from "react";
import styled from "styled-components";
import ResultComponent from "./ResultComponent";
import typeData from "../../assets/data/typeData.json"; // Ensure correct file path

function Result2() {
  // Extract the data with id of 1 (assuming Balanced Type has id 1)
  const balancedType = typeData.types.find(type => type.id === 2);

  return (
    <Wrap>
      {balancedType && (
        <ResultComponent
          title={balancedType.type}
          characteristics={balancedType.characteristics}
          routineRecommendations={balancedType.routine_recommendations}
          celebrityExample={balancedType.celebrity_example}
        />
      )}
    </Wrap>
  );
}

export default Result2;

const Wrap = styled.div`
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
`;
