import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { Reset } from "styled-reset";
import Header from "./components/Header/Header";
import Footer from "./components/footer";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    overflow-y:scroll ;
     scrollbar-width: none;
    ::-webkit-scrollbar {
      display: none; /* for Chrome, Safari, and Opera */
    }
  }

  body {
    font-family: 'Noto Sans TC', sans-serif;
    
  }

  #root {
    min-height: 100vh;
    padding: 140px 0 115px;
    position: relative;
         @media screen and (max-width: 1279px) {
      padding: 102px 0 60px;
    }  
  }
`;

function App() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  const [order, setOrder] = useState(cartItems.length);

  return (
    <>
      <Reset />
      <GlobalStyle />
      <Header order={order} />
      <Outlet context={{ order, setOrder }} />
      <Footer />
    </>
  );
}

export default App;
