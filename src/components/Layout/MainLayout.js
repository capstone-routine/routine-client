import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import backgroundImage from "../../assets/img/testBackground.png";


function MainLayout() {
    return (
        <>  <Wrap>
            <Header />
            
                <Outlet />
            
            <Footer />
            </Wrap>
        </>
    );
}

export default MainLayout;

const Wrap = styled.div`
    background-image: url(${backgroundImage});
    background-size: cover;
`;