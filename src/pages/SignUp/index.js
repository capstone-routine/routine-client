import React from "react";
import { useForm, Controller } from "react-hook-form";

import styled, { keyframes, css } from "styled-components";
import { textColor, secondaryColor, tertiaryColor } from "../../styles/colors";

import { MdEmail } from "react-icons/md";
import { FaKey, FaUserAlt, FaPhone } from "react-icons/fa";

function SignUp() {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    const handlePhoneChange = (e) => {
        const value = e.target.value;
        if (/[^0-9]/.test(value)) {
            e.target.value = value.replace(/[^0-9]/g, "");
        }
    };

    return (
        <SignWrap>
            <BackTop></BackTop>
            <BackBottom>
                <SignFormWrap onSubmit={handleSubmit(onSubmit)}>
                    <Title>회원가입</Title>
                    <InputWrap>
                        <InputName>아이디</InputName>
                        <InputBox $hasError={errors.id}>
                            <MdEmail color="#555" size={20} />
                            <Controller
                                as={Input}
                                name="id"
                                control={control}
                                defaultValue=""
                                rules={{ required: "아이디는 필수입니다." }}
                                render={({ field }) => (
                                    <Input
                                        type="text"
                                        placeholder="EXAMPLE"
                                        {...field}
                                    />
                                )}
                            />
                        </InputBox>
                    </InputWrap>
                    <InputWrap>
                        <InputName>비밀번호</InputName>
                        <InputBox $hasError={errors.password}>
                            <FaKey color="#555" size={20} />
                            <Controller
                                as={Input}
                                name="password"
                                control={control}
                                defaultValue=""
                                rules={{ required: "비밀번호는 필수입니다." }}
                                render={({ field }) => (
                                    <Input
                                        type="password"
                                        placeholder="PASSWORD"
                                        {...field}
                                    />
                                )}
                            />
                        </InputBox>
                    </InputWrap>
                    <InputWrap>
                        <InputName>이름</InputName>
                        <InputBox $hasError={errors.name}>
                            <FaUserAlt color="#555" size={20} />
                            <Controller
                                as={Input}
                                name="name"
                                control={control}
                                defaultValue=""
                                rules={{ required: "이름은 필수입니다." }}
                                render={({ field }) => (
                                    <Input
                                        type="text"
                                        placeholder="홍길동"
                                        {...field}
                                    />
                                )}
                            />
                        </InputBox>
                    </InputWrap>
                    <SubmitButton type="submit">회원가입</SubmitButton>
                </SignFormWrap>
            </BackBottom>
        </SignWrap>
    );
}

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