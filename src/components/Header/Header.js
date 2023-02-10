import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import logo from "./logo.png";
import cart from "./cart.png";
import cartMobile from "./cart-mobile.png";

import searchImg from "./search.png";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #ffffff;
  @media screen and (max-width: 1279px) {
    height: 102px;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  @media screen and (max-width: 1279px) {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
`;

const LeftDiv = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  @media screen and (max-width: 1279px) {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }
`;

const LogoDiv = styled.img`
  width: 258px;
  height: 48px;
  margin-right: 57px;
  margin-left: 60px;
  cursor: pointer;
  @media screen and (max-width: 1279px) {
    width: auto;
    height: 52px;
  }
`;
const CategoryDiv = styled.div`
  display: flex;
  align-items: flex-end;
  @media screen and (max-width: 1279px) {
    height: 50px;
    background-color: #313538;
    width: 100%;
    color: #828282;
    justify-content: center;
    align-items: center;
  }
`;

const CategoryBtn = styled.div`
  width: 150px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  font-size: 20px;
  line-height: 28px;
  letter-spacing: 30px;
  text-indent: 30px;
  cursor: pointer;
  &:hover {
    color: #8b572a;
  }

  @media screen and (max-width: 1279px) {
    align-items: center;
    &:hover {
      color: #fff;
    }
  }
`;
const BtnSplit = styled.div`
  font-size: 20px;
  color: #3f3a3a;
  line-height: 28px;
  @media screen and (max-width: 1279px) {
    color: #828282;
  }
`;

const InputDiv = styled.div`
  margin-left: auto;
  position: relative;
  @media screen and (max-width: 1279px) {
    display: none;
  }
`;

const Input = styled.input`
  width: 214px;
  height: 44px;
  padding-left: 10px;
  border: 1px solid #979797;
  border-radius: 20px;
  font-size: 20px;
  line-height: 24px;
`;

const SearchDiv = styled.div`
  width: 44px;
  height: 44px;
  position: absolute;
  right: 0;
  top: 0;
  background-image: url(${searchImg});
  cursor: pointer;
`;

const MobileOpenInputBtn = styled.div`
  display: none;
  width: 44px;
  height: 44px;
  background-image: url(${searchImg});
  cursor: pointer;
  @media screen and (max-width: 1279px) {
    display: flex;
    position: absolute;
    right: 16px;
    top: 6px;
  }
`;

const MobileInputDiv = styled.div`
  display: none;

  @media screen and (max-width: 1279px) {
    /* display: flex; */
    display: ${(props) => (props.open ? "flex" : "none")};
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 100%;
    top: 6px;
  }
`;
const MobileInput = styled.input`
  display: none;

  @media screen and (max-width: 1279px) {
    display: flex;
    padding-left: 10px;
    width: calc(100% - 20px);
    height: 40px;
    border: 1px solid #979797;
    border-radius: 20px;
    font-size: 20px;
    line-height: 24px;
  }
`;

const MobileSearchBtn = styled.div`
  display: none;
  width: 44px;
  height: 44px;
  background-image: url(${searchImg});
  cursor: pointer;
  @media screen and (max-width: 1279px) {
    display: flex;
    position: absolute;
    right: 16px;
    top: 0px;
    z-index: 10;
  }
`;

const CartBtn = styled.div`
  width: 44px;
  height: 44px;
  margin-right: 28px;
  margin-left: 42px;
  position: relative;
  background-image: url(${cart});
  cursor: pointer;
  @media screen and (max-width: 1279px) {
    display: none;
  }
`;

const CartAmountDiv = styled.div`
  display: ${(props) => (props.ordered > 0 ? "flex" : "none")};
  width: 24px;
  height: 24px;
  position: absolute;
  bottom: 0;
  right: 0;
  border-radius: 50%;
  background-color: #8b572a;
  font-size: 16px;
  line-height: 24px;
  color: #fff;
  justify-content: center;
  cursor: pointer;
`;

const MobileFooter = styled.div`
  display: none;
  width: 100%;
  height: 60px;
  background-color: #313538;
  position: fixed;
  bottom: 0;
  @media screen and (max-width: 1279px) {
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
  }
`;
const MobileCartBtn = styled.div`
  display: none;
  width: 44px;
  height: 44px;

  position: relative;
  background-image: url(${cartMobile});
  @media screen and (max-width: 1279px) {
    display: flex;
  }
`;

const MobileCartAmount = styled(CartAmountDiv)``;

const HeaderSplit = styled.div`
  width: 100%;
  height: 40px;
  background-color: #313538;
  @media screen and (max-width: 1279px) {
    display: none;
  }
`;

function Header(order) {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const navigate = useNavigate();

  useEffect(() => {
    if (category) setInputValue("");
  }, [category]);
  return (
    <>
      <Wrapper>
        <Container>
          <LeftDiv>
            <LogoDiv src={logo} onClick={() => navigate(`/`)} />
            <CategoryDiv>
              <CategoryBtn onClick={() => navigate(`/?category=women`)}>
                女裝
              </CategoryBtn>
              <BtnSplit>|</BtnSplit>
              <CategoryBtn onClick={() => navigate(`/?category=men`)}>
                男裝
              </CategoryBtn>
              <BtnSplit>|</BtnSplit>
              <CategoryBtn onClick={() => navigate(`/?category=accessories`)}>
                配件
              </CategoryBtn>
            </CategoryDiv>
          </LeftDiv>
          <InputDiv>
            <Input
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  navigate(`/?keyword=${inputValue}`);
                }
              }}
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
            />
            <SearchDiv />
          </InputDiv>
          <MobileOpenInputBtn onClick={() => setIsOpen((prev) => !prev)} />
          <MobileInputDiv open={isOpen}>
            <MobileInput
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <MobileSearchBtn
              onClick={(e) => {
                navigate(`/?keyword=${inputValue}`);
                setIsOpen((prev) => !prev);
              }}
            />
          </MobileInputDiv>
          <CartBtn onClick={() => navigate(`/checkout`)}>
            <CartAmountDiv ordered={order.order}>{order.order}</CartAmountDiv>
          </CartBtn>
        </Container>
        <HeaderSplit />
      </Wrapper>
      <MobileFooter>
        <MobileCartBtn onClick={() => navigate(`/checkout`)}>
          <MobileCartAmount ordered={order.order}>
            {order.order}
          </MobileCartAmount>
        </MobileCartBtn>
      </MobileFooter>
    </>
  );
}

export default Header;
