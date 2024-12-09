// ContentComponent.js
import React from "react";
import styled from "styled-components";
import { primaryColor } from "../../styles/colors";

const Content = ({ header, items, onEdit, onDelete, data }) => {
    return (
        <ContentWrapper>
            <Header>{header}</Header>
            <List>
                {items.map((item, index) => (
                    <ListItem key={index}>
                        <Number>{item}</Number>
                        <ValueContainer>
                            <Placeholder>{data[index] || " "}</Placeholder> {/* Display data or empty space */}
                            <DeleteButton onClick={() => onDelete(index)}>삭제</DeleteButton>
                        </ValueContainer>
                    </ListItem>
                ))}
            </List>
            <EditButton onClick={onEdit}>수정</EditButton>
        </ContentWrapper>
    );
};

export default Content;

const ContentWrapper = styled.div`
    background: white;
    padding: 20px;
    border-radius: 10px;
    border: 2px solid #FBE0D1;
    position: relative;
`;

const Header = styled.div`
    margin-bottom: 10px;
    padding: 1px 20px;
    background: ${primaryColor};
    border-radius: 5px;
    display: inline-block;
    color: white;
`;

const List = styled.div`
    margin-bottom: 10px;
`;

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
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    min-height: 20px;
`;

const DeleteButton = styled.button`
    margin-left: 10px;
    padding: 5px 10px;
    background: gray;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
`;

const EditButton = styled.button`
    position: absolute;
    top: 20px;
    right: 20px;
    padding: 1px 30px;
    background: black;
    color: white;
    border: none;
    cursor: pointer;
`;
