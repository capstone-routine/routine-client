import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { secondaryColor, primaryColor, tertiaryColor } from "../../styles/colors";

function Routine() {
  const [tasks, setTasks] = useState(Array(10).fill(null)); // Maximum of 10 tasks
  const [inputValue, setInputValue] = useState("");
  const [selectedType, setSelectedType] = useState("1"); // Default: Fixed Schedule
  const [contentData, setContentData] = useState({ mainGoal: ["", "", ""], achievedList: ["", "", ""] });  

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/session") // 세션 확인 API
      .then((response) => {
        if (response.data.user_id) {
          // 로그인된 상태: 데이터 로드
          axios
            .get(`http://localhost:3000/api/purposefetch?user_id=${response.data.user_id}`)
            .then((res) => {
              setContentData({
                mainGoal: res.data.mainGoals || ["", "", ""],
              });
            })
            .catch((err) => console.error("데이터 로드 오류:", err));
  
          // 루틴 정보 가져오기
          axios
            .get(`http://localhost:3000/api/routinefetch?user_id=${response.data.user_id}`)
            .then((res) => {
              const fetchedTasks = res.data.tasks || [];
              const mappedTasks = fetchedTasks.map((task) => ({
                ...task,
                completed: task.is_completed === 1, // 서버의 is_completed 값을 completed로 매핑
              }));
              const paddedTasks = [...mappedTasks, ...Array(10 - fetchedTasks.length).fill(null)];
              setTasks(paddedTasks.slice(0, 10)); // 항상 10개 유지
            })
            .catch((err) => {
              console.error("Routine fetch failed:", err.response?.data || err.message);
            });
        } else {
          // 로그인되지 않은 상태: 빈 값 유지
          setContentData({
            mainGoal: ["", "", ""],
          });
        }
      })
      .catch((error) => {
        console.error("세션 확인 오류:", error);
        setContentData({
          mainGoal: ["", "", ""],
        });
      });
  }, []);
  
// Task addition
const handleAddTask = (e) => {
  if (e.key === "Enter" && inputValue.trim() !== "") {
    const emptyIndex = tasks.findIndex((task) => task === null);
    console.log("클릭된 emptyIndex:", emptyIndex); // 디버깅용
    if (emptyIndex !== -1) {
      axios.get("http://localhost:3000/api/session") // 세션 확인 API 호출
        .then((response) => {
          if (response.data.user_id) {
            const userId = response.data.user_id; // 세션에서 가져온 user_id
            const newTask = {
              id: emptyIndex, // 빈 index를 id로 설정
              user_id: userId,
              type: selectedType,
              content: selectedType === "4" ? `${inputValue} ${"-".repeat(15)}` : inputValue,
              is_completed: false,
            };
            console.log("생성된 newTask:", newTask); // 디버깅용

            const updatedTasks = [...tasks];
            updatedTasks[emptyIndex] = newTask;
            setTasks(updatedTasks);
            setInputValue("");

            // 서버에 저장
            axios.post("http://localhost:3000/api/routinesave", newTask)
              .then((res) => console.log("저장 성공:", res.data))
              .catch((err) => console.error("Error saving task:", err));
          } else {
            alert("로그인이 필요합니다.");
          }
        })
        .catch((err) => console.error("세션 확인 오류:", err));
    } else {
      alert("최대 10개의 일정만 추가할 수 있습니다.");
    }
  }
};


const toggleTask = (index) => {
  const taskToToggle = tasks[index];

  if (!taskToToggle) {
    console.error("Task is undefined at index:", index);
    return;
  }

  // is_completed 상태를 토글
  taskToToggle.completed = !taskToToggle.completed;
  setTasks([...tasks]);

  // id 값을 명시적으로 처리
  const taskId = taskToToggle.id;

  if (taskId === undefined || taskId === null) {
    console.error("Task ID is missing or invalid:", taskToToggle);
    return;
  }

  axios
    .get("http://localhost:3000/api/session")
    .then((response) => {
      const userId = response.data.user_id;

      if (!userId) {
        alert("로그인이 필요합니다.");
        return;
      }

      const payload = {
        id: taskId, // 0일 경우에도 전달됨
        user_id: userId,
        is_completed: taskToToggle.completed,
      };

      console.log("Payload sent to server:", payload);

      axios
        .put("http://localhost:3000/api/routinetoggle", payload)
        .then((res) => {
          console.log("Task toggled successfully:", res.data);
        })
        .catch((err) => {
          console.error("Error updating task:", err.response?.data || err.message);
          // 에러 발생 시 상태 복구
          taskToToggle.completed = !taskToToggle.completed;
          setTasks([...tasks]);
        });
    })
    .catch((err) => {
      console.error("세션 확인 오류:", err);
    });
};

  // Delete tasks
  const deleteTask = (index) => {
    const taskToDelete = tasks[index];
    if (!taskToDelete) {
      console.error("Task is undefined at index:", index);
      return;
    }
  
    axios.get("http://localhost:3000/api/session") // 세션 확인 API 호출
      .then((response) => {
        const userId = response.data.user_id;
        if (userId) {
          console.log("삭제하려는 유저:", userId);
          console.log("삭제하려는 task ID:", taskToDelete.id);
  
          axios.delete("http://localhost:3000/api/routinedelete", {
            data: { id: taskToDelete.id, user_id: userId },
          })
          .then((res) => {
            console.log("Task deleted:", res.data);
            const updatedTasks = [...tasks];
            updatedTasks[index] = null; // 삭제 후 프론트엔드에서 제거
            setTasks(updatedTasks);
          })
          .catch((err) => console.error("Error deleting task:", err));
        } else {
          alert("로그인이 필요합니다.");
        }
      })
      .catch((err) => console.error("세션 확인 오류:", err));
  };
  

// Calculate and send success rate to the server
const submitSuccessRate = async () => {
  try {
    const sessionResponse = await axios.get("http://localhost:3000/api/session");
    const userId = sessionResponse.data.user_id;

    if (!userId) {
      alert("로그인이 필요합니다.");
      return;
    }

    const routineResponse = await axios.get(`http://localhost:3000/api/routinefetch?user_id=${userId}`);
    const tasks = routineResponse.data.tasks || [];

    // 필터링 조건 수정
    const mainTasks = tasks.filter((task) => task.type === "main일정");
    const completedTasks = mainTasks.filter((task) => task.is_completed == 1);

    const successRate = mainTasks.length > 0
      ? Math.round((completedTasks.length / mainTasks.length) * 100)
      : 100;

    console.log("Total main tasks:", mainTasks.length);
    console.log("Completed tasks:", completedTasks.length);
    console.log("Calculated success rate:", successRate);

    await axios.post("http://localhost:3000/api/routinesubmit", {
      user_id: userId,
      success_rate: successRate,
    });

    alert(`성공률이 저장되었습니다. (${successRate}%) has been saved!`);
    window.location.href = "/routine/review";
  } catch (error) {
    console.error("Error submitting success rate:", error);
    alert("서버 오류가 발생했습니다.");
  }
};





// Reset 버튼 클릭 핸들러
const handleReset = () => {
  axios
    .get("http://localhost:3000/api/session") // 세션 확인 API
    .then((response) => {
      if (response.data.user_id) {
        const userId = response.data.user_id; // 세션에서 가져온 user_id

        // Reset API 호출
        axios
          .delete("http://localhost:3000/api/routinereset", {
            data: { user_id: userId }, // user_id를 요청에 포함
          })
          .then(() => {
            setTasks(Array(10).fill(null)); // 화면 상태 초기화
            console.log("모든 루틴 삭제 성공");
            alert("루틴이 초기화되었습니다.");
          })
          .catch((err) => {
            console.error("루틴 초기화 실패:", err);
            alert("루틴 초기화 중 오류가 발생했습니다.");
          });
      } else {
        alert("로그인이 필요합니다.");
      }
    })
    .catch((err) => {
      console.error("세션 확인 오류:", err);
      alert("세션 확인 중 오류가 발생했습니다.");
    });
};

const typeMapping = {
  고정일정: "1",
  main일정: "2",
  여유시간: "3",
  시간: "4",
};

// Task 배경색을 결정하는 함수
const getTaskColor = (type, completed) => {
  const mappedType = typeMapping[type] || type;

  if (type === "1") return "#e0e0e0"; // Fixed Schedule
  if (type === "3") return tertiaryColor; // Leisure Time
  if (type === "4") return "#ffffff"; // Time
  if (type === "2") {
    // Main 일정의 색상 변경 로직
    return completed ? primaryColor : "#ffffff"; 
  }
  return "#ffffff"; // Default color
};


// Determine text color for each task type and state
const getTextColor = (type, completed) => {
  const mappedType = typeMapping[type] || type;
  if (type === "1" || type === "3") return "#ffffff"; // Fixed Schedule & Leisure Time (white text)
  if (type === "4") return "#555555"; // Time (gray text)
  if (type === "2") return completed ? "#ffffff" : primaryColor; // Main (toggle)
  return "#000000"; // Default black
};

return (
  <Container>
    <Header>
      <Title>메인 목적</Title>
      <InputContainer>
        {contentData.mainGoal.map((goal, index) => (
          //<Input key={index} value={goal} readOnly />
          <ListItem key={index}>
              <Number>{index + 1}</Number>
              <ValueContainer>
                <Placeholder>{goal || " "}</Placeholder>
              </ValueContainer>
          </ListItem>
        ))}
      </InputContainer>
    </Header>
    <TimeBox>
      <ButtonRow>
        <TimeBoxButton>Time-box</TimeBoxButton>
       <ActionButtons>
        <Button onClick={handleReset}>리셋</Button>
        <Button onClick={submitSuccessRate}>제출</Button>
       </ActionButtons>
      </ButtonRow>
      {/* Task Addition */}
      <AddTaskContainer>
        <TaskTypeButton
          selected={selectedType === "1"}
          color="#e0e0e0"
          onClick={() => setSelectedType("1")}
        >
          +고정일정
        </TaskTypeButton>
        <TaskTypeButton
          selected={selectedType === "2"}
          color={primaryColor}
          onClick={() => setSelectedType("2")}
        >
          +main일정
        </TaskTypeButton>
        <TaskTypeButton
          selected={selectedType === "3"}
          color={tertiaryColor}
          onClick={() => setSelectedType("3")}
        >
          +여유시간
        </TaskTypeButton>
        <TaskTypeButton
          selected={selectedType === "4"}
          color="#555555"
          onClick={() => setSelectedType("4")}
        >
          +시간
        </TaskTypeButton>
        <TaskInput
          placeholder="영역 클릭, 입력 후 엔터..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleAddTask}
        />
      </AddTaskContainer>
      <br />
      <TaskList>
        {tasks.map((task, index) => (
          <Task
          key={index}
          onClick={() => toggleTask(index)}
          completed={task?.completed}
          color={getTaskColor(typeMapping[task?.type] || task?.type, task?.completed)} // 업데이트된 getTaskColor
          textColor={getTextColor(typeMapping[task?.type] || task?.type, task?.completed)} // 기존 텍스트 색상 로직
          type={task?.type}
        >
          {task && (
            <>
              {task.content}
              <DeleteButton
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTask(index);
                }}
              >
                🗑️
              </DeleteButton>
            </>
          )}
        </Task>
        ))}
      </TaskList>
    </TimeBox>
  </Container>
);
}

export default Routine;

// Styled Components

const ListItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Number = styled.div`
  width: 30px;
  height: 30px;
  background: black;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;

  margin-right: 10px;
`;

const ValueContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

const Placeholder = styled.div`
  flex: 1;
  padding: 4px;
  border: 1px solid ${secondaryColor};
  border-radius: 4px;
  min-height: 20px;
  background: white;
`;

const Container = styled.div`
width: 100%;
max-width: 600px;
margin: 0 auto;
padding: 20px;
background-color: ${secondaryColor};
border-radius: 10px;
`;

const Header = styled.div`
background-color: ${primaryColor};
padding: 20px;
border-radius: 10px;
`;

const Title = styled.h3`
color: white;
margin: 0;

`;

const InputContainer = styled.div`
gap: 10px;
margin-top: 10px;
position: relative;
`;

const Input = styled.input`
flex: 1;
padding: 8px;
font-size: 14px;
border: 1px solid #ccc;
border-radius: 5px;
background-color: #fff;
`;

const TimeBox = styled.div`
margin-top: 20px;
padding: 20px;
background-color: #fff;
border-radius: 10px;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const TimeBoxButton = styled.button`
  flex: 2; /* TimeBox 버튼이 더 길게 */
  padding: 2px 0px; /* 넉넉한 크기 */
  background-color: #333;
  color: #fff;
  border: 2px solid #333;
  border-radius: 0; /* 둥근 모서리 제거 */
  font-size: 16px;
  font-weight: bold;
  pointer-events: none; /* 클릭 비활성화 */
  margin-right: 20px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  flex: 1;
  padding: 4px 5px;
  background-color: #333;
  color: #fff;
  border: 2px solid #333;
  border-radius: 0; /* 둥근 모서리 제거 */
  font-size: 14px;
  &:hover {
    background-color: #555;
  }
`;

const TaskList = styled.div`
display: flex;
flex-direction: column;
gap: 10px;
`;

const Task = styled.div`
background-color: ${(props) => props.color  };
color: ${(props) => props.textColor};
border: 1px solid #ccc;
height: 40px;
cursor: ${(props) => (props.type === "4" ? "default" : "pointer")}; /* 시간 is not clickable */
display: flex;
align-items: center;
justify-content: space-between;
padding: 0 10px;
border-radius: 5px;
`;

const DeleteButton = styled.button`
background: none;
border: none;
font-size: 16px;
cursor: pointer;
`;

const AddTaskContainer = styled.div`
margin-top: 20px;
display: flex;
gap: 10px;

`;

const TaskTypeButton = styled.button`
padding: 5px 10px;
font-size: 14px;
font-weight: bold;
color: ${(props) => (props.selected ? props.color : "#fff")}; /* Selected: original color */
background-color: ${(props) => (props.selected ? "#fff" : props.color)}; /* Selected: white */
border: ${(props) => (props.selected ? `4px solid ${props.color}` : `2px solid ${props.color}`)}; /* Dynamic border color */
border-radius: 5px;
cursor: pointer;
transition: all 0.3s ease;

&:hover {
  transform: scale(1.05); /* Slight zoom on hover */

}

&:active {
  transform: scale(0.95); /* Slight shrink for tactile feedback */
}
`;

const TaskInput = styled.input`
flex: 1;
padding: 10px;
font-size: 14px;
border: 1px solid #ccc;
border-radius: 5px;
`;