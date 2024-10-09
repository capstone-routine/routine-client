import { createGlobalStyle } from "styled-components";

import fontLight from "../assets/fonts/SCDream3.otf";
import fontRegular from "../assets/fonts/SCDream4.otf";
import fontMedium from "../assets/fonts/SCDream5.otf";
import fontTitle from "../assets/fonts/SoukouMincho.ttf";
import fontText from "../assets/fonts/ChosunSg.TTF";

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'SCDream';
        src: url(${fontLight}) format('opentype');
        font-weight: 300;
        font-style: normal;
    }
    @font-face {
        font-family: 'SCDream';
        src: url(${fontRegular}) format('opentype');
        font-weight: 400;
        font-style: normal;
    }
    @font-face {
        font-family: 'SCDream';
        src: url(${fontMedium}) format('opentype');
        font-weight: 500;
        font-style: normal;
    }
    @font-face {
        font-family: 'SoukouMincho';
        src: url(${fontTitle}) format('truetype');
        font-weight: 600;
        font-style: normal;
    }
        @font-face {
        font-family: 'ChosunSg';
        src: url(${fontText}) format('truetype');
        font-weight: 300;
        font-style: normal;
    }

    * {
        margin: 0;
        padding: 0;
        border: 0;
        border-collapse: collapse;
        box-sizing: border-box;
        word-wrap: break-word;
        font-weight: 400;
        -webkit-tap-highlight-color: transparent;
        touch-action: manipulation;
        letter-spacing: 0;
    }

    html {
        height: 100%;
        width: 100%;
        font-size: 62.5%;
        overflow: hidden;
    }

    body {
        height: 100%;
        width: 100%;
        font-family: "SCDream";
        font-weight: 400;
        overflow-x: hidden;
        letter-spacing: 1px;
        font-size: 1.6rem;
    }

    ul,
    li {
        list-style: none;
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    label,
    button,
    a {
        cursor: pointer;
    }

    input,
    textarea {
        outline: none;
        font-family: "ChosunSg";  /* ChosunSg 폰트 사용 */
        font-size: 1.6rem; 
        border-radius: 0; 
        -webkit-border-radius: 0; 
        -moz-border-radius: 0; 
    }

    p { 
        font-family: "ChosunSg";
    }

    button { 
        font-family: "SCDream";  /* SCDream 폰트 사용 */
        font-size: 1.6rem; 
        border-radius: 0; 
        -webkit-border-radius: 0; 
        -moz-border-radius: 0; 
    }


    #App {
        position: relative;
        min-height: 100vh;
    }
`;

export default GlobalStyle;