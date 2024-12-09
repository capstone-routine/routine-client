import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes, css } from "styled-components";
import { textColor, secondaryColor, tertiaryColor } from "../../styles/colors";
import { MdEmail } from "react-icons/md";
import { FaKey } from "react-icons/fa";



const SignUp = () => {
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const submitBtn = async () => {
        // 필수 입력값 확인
        if (!id || !pw || !name) {
            alert('아이디, 비밀번호 또는 이름을 입력해주시기 바랍니다.');
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/addUser`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userID: id, userPW: pw, userName: name }),
            });

            const result = await response.json();

            if (response.status === 200) {
                alert('회원가입 성공!');
                setId('');
                setPw('');
                setName('');
                navigate('/signIn'); // 회원가입 성공 후 로그인 페이지로 이동
            } else {
                alert('회원가입 실패: ' + result.message);
            }
        } catch (error) {
            console.error('회원가입 요청 중 오류:', error);
            alert('서버와 통신 중 문제가 발생했습니다.');
        }
    };

    return (
        <SignWrap>
            <BackTop />
            <BackBottom>
                <SignFormWrap>
                    <Title>회원가입</Title>

                    <InputWrap>
                        <InputName>아이디</InputName>
                        <InputBox $hasError={!id}>
                            <MdEmail color="#555" size={20} />
                            <Input
                                type="text"
                                placeholder="EXAMPLE"
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                            />
                        </InputBox>
                    </InputWrap>

                    <InputWrap>
                        <InputName>비밀번호</InputName>
                        <InputBox $hasError={!pw}>
                            <FaKey color="#555" size={20} />
                            <Input
                                type="password"
                                placeholder="PASSWORD"
                                value={pw}
                                onChange={(e) => setPw(e.target.value)}
                            />
                        </InputBox>
                    </InputWrap>

                    <InputWrap>
                        <InputName>이름</InputName>
                        <InputBox $hasError={!name}>
                            <Input
                                type="text"
                                placeholder="NAME"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </InputBox>
                    </InputWrap>

                    <SubmitButton type="button" onClick={submitBtn}>
                        회원가입
                    </SubmitButton>
                </SignFormWrap>
            </BackBottom>
        </SignWrap>
    );
};

export default SignUp;

const SignWrap = styled.div`
    width: 100%;
    min-height: calc(100vh - 90px - 130px);
`;

const BackTop = styled.div`
    width: 100%;
    height: 120px;
    background-color: #fff8ed;
    // background-image: url("https://kr.object.ncloudstorage.com/elderlinker/bg-top.png");
    background-size: 100%;
    background-position: center top;
    background-repeat: no-repeat;
`;

const BackBottom = styled.div`
    width: 100%;
    min-height: calc(100vh - 90px - 130px - 120px);
    background-color: #fff8ed;
    /* background-image: url("https://kr.object.ncloudstorage.com/elderlinker/bg-center.png"),
        url("https://kr.object.ncloudstorage.com/elderlinker/bg-bottom.png"); */
    background-size: 100% calc(100% - 580px), 100% auto;
    background-position: center top, center bottom;
    background-repeat: no-repeat;
    padding-bottom: 120px;
`;

const SignFormWrap = styled.form`
    width: 1200px;
    text-align: center;
    padding: 60px 0;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 15px;
`;

const Title = styled.p`
    font-size: 3.6rem;
    font-weight: 500;
    color: ${textColor};
    margin-bottom: 20px;
`;

const InputWrap = styled.div`
    width: 600px;
    margin: 0 auto;
    text-align: left;

    & + & {
        margin-top: 20px;
    }
`;

const InputName = styled.p`
    color: ${textColor};
    font-weight: 500;
    margin-bottom: 5px;
`;

const shake = keyframes`
    0% { transform: translateX(0); }
    10% { transform: translateX(-10px); }
    20% { transform: translateX(10px); }
    30% { transform: translateX(-10px); }
    40% { transform: translateX(10px); }
    50% { transform: translateX(0); }
    100% { transform: translateX(0); }
`;

const shakeAnimation = css`
    ${shake} 0.6s cubic-bezier(.36,.07,.19,.97) both
`;

const InputBox = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 60px;
    padding: 20px 30px;
    border-radius: 10px;
    border: 1px solid #eee;
    border-color: ${(props) => (props.$hasError ? tertiaryColor : "#eee")};
    animation: ${(props) => (props.$hasError ? shakeAnimation : "none")};
    box-shadow: ${(props) =>
        props.$hasError ? "0 0 10px rgba(255, 115, 92, .2)" : "none"};
`;

const Input = styled.input`
    height: 100%;
    margin-left: 20px;
    color: ${textColor};
    font-size: 1.5rem;
    font-weight: 400;

    &::placeholder {
        color: #ccc;
    }
`;

const SubmitButton = styled.button`
    width: 600px;
    height: 60px;
    color: #fff;
    background-color: ${secondaryColor};
    border-radius: 10px;
    margin-top: 50px;
`;