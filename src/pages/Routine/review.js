import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { primaryColor } from "../../styles/colors";

function Review({ successRate }) {
  const [feedback, setFeedback] = useState({
    strengths: "",
    improvements: "",
  });

  const [localSuccessRate, setLocalSuccessRate] = useState(0);
  const [userId, setUserId] = useState(null);

  // Fetch session data and review data
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/session`, { withCredentials: true })
      .then((response) => {
        const userId = response.data.user_id;
        setUserId(userId);
  
        if (userId) {
          axios
            .get(`${process.env.REACT_APP_API_URL}/api/reviewfetch?user_id=${userId}`, { withCredentials: true })
            .then((res) => {
              console.log("Fetched latest review data:", res.data);
              const { success_rate, achievement, improvement } = res.data;
              setLocalSuccessRate(success_rate || 0);
              setFeedback({
                strengths: achievement || "",
                improvements: improvement || "",
              });
            })
            .catch((err) => console.error("Error fetching review data:", err));
        }
      })
      .catch((err) => console.error("Error fetching session data:", err));
  }, []);

  const handleSubmit = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/reviewinput`, {
        user_id: userId,
        strengths: feedback.strengths,
        improvements: feedback.improvements,
      }, { withCredentials: true })
      .then((res) => {
        console.log("Review updated successfully:", res.data);
        alert("Review updated successfully!");
      })
      .catch((err) => {
        console.error("Error updating review:", err);
        alert("Error updating review. Check console for details.");
      });
  };

  return (
    <Wrap>
    <Container>
      <Header>Review Submission</Header>
      <SuccessRate>
        <Label>Success Rate:</Label>
        <Rate>{localSuccessRate}%</Rate>
      </SuccessRate>
      <FeedbackSection>
        <label>
          성취한 점:
          <TextArea
            value={feedback.strengths}
            onChange={(e) =>
              setFeedback({ ...feedback, strengths: e.target.value })
            }
          />
        </label>
        <label>
          개선할 점:
          <TextArea
            value={feedback.improvements}
            onChange={(e) =>
              setFeedback({ ...feedback, improvements: e.target.value })
            }
          />
        </label>
      </FeedbackSection>
      <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
    </Container>
    </Wrap>
  );
}

export default Review;



// Styled Components

const Wrap = styled.div`
  height: 600px;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 700px;
  height: 400px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Header = styled.h3`
  text-align: center;
  font-weight: bold;
  color: ${primaryColor};
  margin-bottom: 20px;
`;

const SuccessRate = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 40px;
`;

const Label = styled.span`
  font-weight: bold;
  font-size: 1.2rem;
  color: #555;
  margin-right: 5px;
`;

const Rate = styled.span`
  font-size: 1.2rem;
  color: #333;
`;

const FeedbackSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 14px;
  resize: none;
`;

const SubmitButton = styled.button`
  margin-top: 20px;
  width: 150px;
  padding: 10px 20px;
  border: 1.5px solid ${primaryColor};
  border-radius: 5px;
  background-color: ${primaryColor};
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  align-self: center;

  &:hover {
    background-color: white;
    color: ${primaryColor};
  }
`;