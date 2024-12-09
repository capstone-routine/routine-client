import React, { useState } from "react";
import styled from "styled-components";
import botIcon from "../../assets/img/bot.png"; // Adjust the path if necessary
import userIcon from "../../assets/img/profile.png"; // Adjust the path if necessary
import { MessageList, MessageInput, TypingIndicator } from "@chatscope/chat-ui-kit-react";
//import config from "../../apikey.js";

const API_KEY = process.env.REACT_APP_API_KEY;

function SideContent() {

  const systemMessage = {
    role: "system",
    content:
      "당신은 유저의 메인 목적을 이루기 위해서 필요한 수행 리스트를 6단계로 뽑아주는 AI챗봇입니다.",
  };

  const [messages, setMessages] = useState([
    {
      message: `안녕하세요 저는 당신의 메인 목적을 이루기 위해서 필요한 수행 리스트를 6단계로 뽑아주는 AI챗봇입니다.
메인 목적을 적어주세요:)`, // 줄바꿈 포함된 초기 메시지
      sentTime: "just now",
      sender: "ChatGPT",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const formatMessageWithLineBreaks = (text) => {
    return text.split("\n").map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ));
  };

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: "outgoing",
      sender: "user",
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);

    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = messageObject.sender === "ChatGPT" ? "assistant" : "user";
      return { role: role, content: messageObject.message };
    });

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...apiMessages],
      max_tokens: 500,
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => data.json())
      .then((data) => {
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: "ChatGPT",
          },
        ]);
        setIsTyping(false);
      });
  }

  return (
    <ChatWrapper>
      <MessageListContainer>
        <MessageList
          scrollBehavior="smooth"
          typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null}
        >
          {messages.map((message, i) => (
            <MessageRow key={i} className={message.sender === "ChatGPT" ? "chatgpt" : "user"}>
              <MessageIcon>
                {message.sender === "ChatGPT" ? (
                  <img src={botIcon} alt="ChatGPT" width="40" height="40" />
                ) : (
                  <img src={userIcon} alt="User" width="40" height="40" />
                )}
              </MessageIcon>
              <StyledMessage className={message.sender === "ChatGPT" ? "chatgpt" : "user"}>
                {formatMessageWithLineBreaks(message.message)}
              </StyledMessage>
            </MessageRow>
          ))}
        </MessageList>
      </MessageListContainer>
      <MessageInputContainer>
        <MessageInput placeholder="메시지를 입력하세요" onSend={handleSend} attachButton={false} />
      </MessageInputContainer>
    </ChatWrapper>
  );
}

export default SideContent;

// Styled components
const ChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 700px;
  min-width: 350px;
  position: relative;
  background: #fff;
  border-radius: 10px;
  border: 2px solid #fbe0d1;
`;

const MessageListContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;
`;

const MessageInputContainer = styled.div`
  position: sticky;
  bottom: 0;
  background: white;
  padding: 10px;
  border-top: 1px solid #ddd;
  border-radius: 10px;
`;

const MessageRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  &.user {
    flex-direction: row-reverse;
  }
`;

const MessageIcon = styled.div`
  margin: 0 10px;
`;

const StyledMessage = styled.div`
  max-width: 70%;
  padding: 10px;
  border-radius: 10px;
  font-size: 14px;

  &.chatgpt {
    background: #f5f5f5;
    color: #333;
    border-radius: 10px 10px 10px 0;
  }

  &.user {
    background: #d1e7fd;
    color: #000;
    border-radius: 10px 10px 0 10px;
  }
`;
