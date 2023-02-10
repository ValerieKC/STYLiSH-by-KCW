import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import logo from "./logo.png";
import cart from "./cart.png";
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
`;

const Container = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
`;

const LogoDiv = styled.img`
  width: 258px;
  height: 48px;
  margin-right: 57px;
  margin-left: 60px;
  cursor: pointer;
`;
const CategoryDiv = styled.div`
  display: flex;
  align-items: flex-end;
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
`;
const BtnSplit = styled.div`
  font-size: 20px;
  color: #3f3a3a;
  line-height: 28px;
`;

const InputDiv = styled.div`
  margin-left: auto;
  position: relative;
`;

const Input = styled.input`
  width: 214px;
  height: 44px;
  padding-left: 10px;
  border: 1px solid #979797;
  border-radius: 20px;
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

const CartBtn = styled.div`
  width: 44px;
  height: 44px;
  margin-right: 28px;
  margin-left: 42px;
  position: relative;
  background-image: url(${cart});
  cursor: pointer;
`;

const CartAmountDiv = styled.div`
  display: ${(props) => (props.ordered>0 ? "flex" : "none")};
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
`;
const HeaderSplit = styled.div`
  width: 100%;
  height: 40px;
  background-color: #313538;
`;

function Header(order) {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Container>
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
        <InputDiv>
          <Input />
          <SearchDiv />
        </InputDiv>
        <CartBtn onClick={() => navigate(`/checkout`)}>
          <CartAmountDiv ordered={order.order}>{order.order}</CartAmountDiv>
        </CartBtn>
      </Container>
      <HeaderSplit />
    </Wrapper>
  );
}

export default Header;
