import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { primaryColor, tertiaryColor } from '../../styles/colors';
import balancedImage from '../../assets/img/Balanced.png';
import perfectionistImage from '../../assets/img/Perfectionist.png';
import spontaneousImage from '../../assets/img/Spontaneous.png';
import socialImage from '../../assets/img/Social.png';
import emotionalImage from '../../assets/img/Emotional.png';
import goalOrientedImage from '../../assets/img/GoalOriented.png';

function MyPage() {
  const [userData, setUserData] = useState({ name: "", type: "" });
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null); // 에러 상태 추가
  const navigate = useNavigate();

  // 타입별 경로 매핑
  const typePageMap = {
    "Balanced Type": "/typetest/result1",
    "Perfectionist": "/typetest/result2",
    "Spontaneous Type": "/typetest/result3",
    "Social Type": "/typetest/result4",
    "Emotional Type": "/typetest/result5",
    "Goal-Oriented Type": "/typetest/result6",
  };

  const typeImageMap = {
    "Balanced Type": balancedImage,
    "Perfectionist": perfectionistImage,
    "Spontaneous Type": spontaneousImage,
    "Social Type": socialImage,
    "Emotional Type": emotionalImage,
    "Goal-Oriented Type": goalOrientedImage,
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchUserData();
      await fetchReviews();
    };

    fetchData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/userdata");
      setUserData({
        name: response.data.userName,
        type: response.data.userType,
      });
    } catch (error) {
      setError("Failed to fetch user data.");
      console.error("Error fetching user data:", error);
    }
  };

  const fetchReviews = async () => {
    try {
      const sessionResponse = await axios.get("http://localhost:3000/api/session");
      const userId = sessionResponse.data.user_id;

      if (userId) {
        const reviewResponse = await axios.get(
          `http://localhost:3000/api/myreviewfetch?user_id=${userId}`
        );

        const mappedReviews = reviewResponse.data.map((review) => ({
          id: review.id, // 각 리뷰의 고유 ID
          successRate: review.success_rate,
          strengths: review.achievement,
          improvements: review.improvement,
        }));

        setReviews(mappedReviews);
      }
    } catch (error) {
      setError("Failed to fetch reviews.");
      console.error("Error fetching reviews:", error);
    }
  };

  const handleTypeClick = () => {
    const path = typePageMap[userData.type];
    if (path) {
      navigate(path);
    } else {
      alert(userData.type ? "알 수 없는 타입입니다." : "유저 타입 정보가 없습니다.");
    }
  };

  const deleteReview = async (index) => {
    try {
        // 사용자 세션에서 user_id 가져오기
        const sessionResponse = await axios.get("http://localhost:3000/api/session");
        const userId = sessionResponse.data.user_id;

        console.log("Delete request with user_id:", userId, "index:", index);

        // 백엔드로 삭제 요청 보내기
        await axios.delete("http://localhost:3000/api/deletereview", {
            data: { index, user_id: userId },
        });

        // 상태에서 해당 리뷰 제거
        setReviews((prevReviews) =>
            prevReviews.filter((_, reviewIndex) => reviewIndex !== index)
        );

        alert("Review deleted successfully.");
    } catch (error) {
        console.error("Error deleting review:", error);
        alert("Failed to delete the review. Please try again.");
    }
};

  return (
    <Wrap>
    <Header>My Page</Header>
    <Container>
      <UserInfo>
        <UserField>
          <Label>Name</Label>
          <Value>{userData.name || "Loading..."}</Value>
        </UserField>
        <UserField>
          <Label>Type</Label>
          <TypeDisplay>
            <TypeImage
                src={typeImageMap[userData.type] || ""}
                alt={userData.type || "Unknown"}
              />
            <TypeLink onClick={handleTypeClick}>
              {userData.type || "No type assigned"}
            </TypeLink>
          </TypeDisplay>
        </UserField>
      </UserInfo>

      <ReviewSection>
        <SectionHeader>Reviews</SectionHeader>
        {error && <ErrorMessage>{error}</ErrorMessage>} {/* 에러 메시지 표시 */}
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <ReviewCard key={review.id}>
              <ReviewHeader>
                <DayLabel>{`${index + 1}일차`}</DayLabel>
              </ReviewHeader>
              <ReviewBody>
                <SuccessRate>{review.successRate}%</SuccessRate>
                <SideContainer>
                  <Feedback>
                    <FeedbackLabel>성취한 점</FeedbackLabel>
                    <FeedbackText>{review.strengths || "No data"}</FeedbackText>
                  </Feedback>
                  <Feedback>
                    <FeedbackLabel>개전할 점</FeedbackLabel>
                    <FeedbackText>{review.improvements || "No data"}</FeedbackText>
                  </Feedback>
                </SideContainer>
              </ReviewBody>
              <DeleteButton onClick={() => deleteReview(index)}>
                삭제
              </DeleteButton>
            </ReviewCard>
          ))
        ) : (
          <NoReviews>No reviews available</NoReviews>
        )}
      </ReviewSection>
    </Container>
    </Wrap>
  );
}

export default MyPage;

// Styled Components

const Wrap = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;

`;

const Container = styled.div`
    padding: 40px;
`;

const Header = styled.h1`
  font-size: 1.8em;
  font-weight: bold;
  text-align: center;
  background-color: ${primaryColor};
  color: white;
  margin-top: 50px;
  padding: 10px 0;
  margin-bottom: 30px;
  width: 100%;
  padding: 15px;
`;

const UserInfo = styled.div`
  margin-bottom: 30px;
`;

const UserField = styled.div`
  display: flex;
  flex-direction: column; /* Align items vertically */
  margin-bottom: 10px;
`;

const Label = styled.span`
  font-weight: bold;
  color: #444;
  margin-bottom: 5px; /* Add spacing between Label and Value */
`;

const Value = styled.span`
  color: #333;
  margin: 20px;
  font-size: 3rem;
  color: #ff8082;
  font-weight: 500;
`;

const TypeLink = styled.div`
  margin: 20px;
  cursor: pointer;
  text-decoration: none;
  color: white;
  background-color: #ff8082;
  width: 250px;
  height: 40px;
  display: flex;
  align-items: center;
  padding-left: 20px;
`;

const TypeDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 20px;
  border: 1px solid #ff8082;
  padding-left: 20px;
  width: 500px;
  border-radius: 20px;
`;

const TypeImage = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
`;

const ReviewSection = styled.div`
  margin-top: 20px;
`;

const SectionHeader = styled.h2`
  color: #333;
  margin-bottom: 20px;
`;

const ReviewCard = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const DayLabel = styled.span`
  font-weight: bold;
  background-color: ${tertiaryColor};
  color: white;
  width: 80px;
  height: 25px;
  text-align: center;
  border-radius: 5px;
`;

const SuccessRate = styled.span`
  font-size: 3rem;
  font-weight: 500;
  display: flex; 
  justify-content: center;
  align-items: center; 
  width: 130px;
`;

const SideContainer = styled.div``;

const ReviewBody = styled.div`
  display: flex;
  //flex-direction: column;
  gap: 10px;
`;

const Feedback = styled.div`
  display: flex;
`;

const FeedbackLabel = styled.span`
  background-color: black;
  color: white;
  width: 70px;
  height: 25px;
`;

const FeedbackText = styled.p`
  color: #333;
  height: 60px;
  margin-left: 20px;
  margin-top: 3px;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 10px; /* 부모 컨테이너의 하단에서 10px */
  right: 10px; /* 부모 컨테이너의 오른쪽에서 10px */
  background-color: ${tertiaryColor};
  border: none;
  color: white;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  height: 35px;

  &:hover {
    background-color: #654995;
  }
`;

const NoReviews = styled.p`
  text-align: center;
  color: #999;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  text-align: center;
`;
