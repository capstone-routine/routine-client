// input.js
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SideContent from "./SideContentComponent";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function PurposeInput() {
    const [selectedNumber, setSelectedNumber] = useState(1);
  const [formData, setFormData] = useState({ mainGoal: "", achievedList: "" });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/session")
      .then((sessionResponse) => {
        const user_id = sessionResponse.data.user_id;

        if (user_id) {
          axios
            .get(`http://localhost:3000/api/purposefetch?user_id=${user_id}`)
            .then((response) => {
              const fetchedData = response.data;

              setFormData({
                mainGoal: fetchedData.mainGoals[selectedNumber - 1] || "",
                achievedList: fetchedData.achievedLists[selectedNumber - 1] || "",
              });
            })
            .catch((error) => {
              console.error("목적 데이터 로드 실패:", error);
            });
        } else {
          alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
          navigate("/SignIn");
        }
      })
      .catch((error) => {
        console.error("세션 확인 중 오류 발생:", error);
        alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
        navigate("/SignIn");
      });
  }, [selectedNumber]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const apiPayload = {
      selectedNumber: selectedNumber,
      mainGoal: formData.mainGoal,
      achievedList: formData.achievedList,
    };

    console.log("API Payload:", apiPayload);

    axios
      .post("http://localhost:3000/api/purposeupdate", apiPayload)
      .then((response) => {
        alert(response.data.message);
        navigate("/purpose");
      })
      .catch((error) => {
        console.error("API 요청 중 오류 발생:", error);
        alert("데이터 저장 중 문제가 발생했습니다. 다시 시도해주세요.");
      });
  };

  return (
    <Intro>
      <Wrap>
        <RightSide>
          <Form>
            <Label>수정 페이지</Label>
            <SelectNumber>
              <label>번호 선택: </label>
              <select
                value={selectedNumber}
                onChange={(e) => setSelectedNumber(Number(e.target.value))}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </select>
            </SelectNumber>
            <Input
              type="text"
              name="mainGoal"
              value={formData.mainGoal}
              onChange={handleChange}
              placeholder="Main Goal"
            />
            <Textarea
              name="achievedList"
              value={formData.achievedList}
              onChange={handleChange}
              placeholder="Achieved List"
            />
            <SubmitButton onClick={handleSubmit}>제출</SubmitButton>
          </Form>
        </RightSide>
        <LeftSide>
          <SideContent />
        </LeftSide>
      </Wrap>
    </Intro>
  );
}

export default PurposeInput;

const Intro = styled.div`
    width: 100%;
    height: 650px;
    background-color: white;
`;

const Wrap = styled.div`
    display: flex;
    width: 1280px;
    height: 100%;
    margin: 0 auto;
`;

const LeftSide = styled.div`
    flex: 1;
    padding: 20px;
`;

const RightSide = styled.div`
    flex: 2;
    padding: 20px;
    display: flex;
    flex-direction: column;
`;

const Form = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Label = styled.div`
    font-size: 20px;
    margin-bottom: 10px;
`;

const SelectNumber = styled.div`
    margin-bottom: 10px;
`;

const Input = styled.input`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const Textarea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  height: 150px; /* 5x the height of a normal input */
  white-space: pre-wrap; /* 줄바꿈을 HTML에서 유지 */
  word-wrap: break-word; /* 긴 단어 줄바꿈 */
`;

const SubmitButton = styled.button`
    padding: 10px 20px;
    background-color: black;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
`;
