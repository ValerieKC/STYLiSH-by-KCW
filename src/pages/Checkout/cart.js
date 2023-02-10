import styled from "styled-components";
import { useState } from "react";
import deleteSign from "./cart-remove.png";
import deleteHover from "./cart-remove-hover.png";

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 30px;
  margin-bottom: 16px;
`;

const TitleCart = styled.div`
  font-weight: bold;
  @media screen and (max-width: 1279px) {
    margin-left: 30px;
  }
`;

const TitlePurchaseList = styled.div`
  display: flex;
  align-items: center;
  @media screen and (max-width: 1279px) {
    display: none;
  }
`;

const MobileTitlePurchaseList = styled.div`
  display: none;
  align-items: center;
  @media screen and (max-width: 1279px) {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    margin-bottom: 12px;
  }
`;
const TitleAmount = styled.div`
  width: 80px;
  margin-right: 56px;
  text-align: center;
  @media screen and (max-width: 1279px) {
    margin-right: 12px;
  }
`;
const TitlePrice = styled.div`
  width: 192px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 1279px) {
    width: 104px;
  }
`;
const TitleBlank = styled.div`
  width: 44px;
  height: 16px;
`;
const CartPanel = styled.div`
  padding: 40px 30px;
  display: flex;
  flex-direction: column;
  row-gap: 30px;
  border: 1px solid #979797;
  @media screen and (max-width: 1279px) {
    padding-top: 0;
    border: none;
  }
`;

const ProductDiv = styled.div`
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 1279px) {
    flex-direction: column;
    position: relative;
    padding-top: 10px;
    padding-bottom: 20px;
    border-bottom: 1px solid #3f3a3a;

    :first-child {
      border-top: 1px solid #3f3a3a;
    }
  }
`;
const ProductDetailPanel = styled.div`
  display: flex;
  
`;

const ProductImg = styled.img`
  width: 114px;
  height: 152px;
  margin-right: 16px;
`;

const ProductDetail = styled.div`
  display: flex;
  flex-direction: column;
`;

const Text = styled.div`
  margin-bottom: 16px;
`;
const PropertyText = styled.div`
  margin-bottom: 10px;
`;

const PurchaseList = styled.div`
  display: flex;
  align-items: center;
  @media screen and (max-width: 1279px) {
    justify-content: space-between;
  }
`;
const QuantitySelect = styled.select`
  width: 80px;
  height: 30px;
  padding-left: 17px;
  margin-right: 56px;
  border-radius: 8px;
  border: solid 1px #979797;
  background-color: #f3f3f3;
  @media screen and (max-width: 1279px) {
    margin-right: 12px;
  }
`;

const PriceDiv = styled.div`
  width: 192px;
  height: 16px;
  display: flex;
  justify-content: center;
  @media screen and (max-width: 1279px) {
    width: 104px;
  }
`;

const TrashDiv = styled.div`
display: flex;
  width: 44px;
  height: 44px;
  background-image: url(${deleteSign});
  cursor: pointer;
  &:hover {
    background-image: url(${deleteHover});
  }

  @media screen and (max-width: 1279px) {
    display: none;
  }
`;

const MobileTrashDiv = styled.div`
  display: none;
  width: 44px;
  height: 44px;
  background-image: url(${deleteSign});
  cursor: pointer;
  &:hover {
    background-image: url(${deleteHover});
  }

  @media screen and (max-width: 1279px) {
    display: flex;
    position: absolute;
    right:0;
  }
`;

function Cart(){
  const [cartItems,setCartItems]=useState(JSON.parse(localStorage.getItem("cart")) || [])

  function changeItemQuantity(itemIndex, itemQuantity) {
    const newCartItems = cartItems.map((item, index) =>
      index === itemIndex
        ? {
            ...item,
            qty: itemQuantity,
          }
        : item
    );
    setCartItems(newCartItems);
    localStorage.setItem("cart", JSON.stringify(newCartItems));
    window.alert("已修改數量");
  }

  function deleteItem(itemIndex) {
    const newCartItems = cartItems.filter((_, index) => index !== itemIndex);
    setCartItems(newCartItems);
    localStorage.setItem("cart", JSON.stringify(newCartItems));
    window.alert("已刪除商品");
  }
  
  console.log(cartItems)
  return (
    <>
      <Title>
        <TitleCart>購物車({cartItems.length})</TitleCart>
        <TitlePurchaseList>
          <TitleAmount>數量</TitleAmount>
          <TitlePrice>單價</TitlePrice>
          <TitlePrice>小計</TitlePrice>
          <TitleBlank></TitleBlank>
        </TitlePurchaseList>
      </Title>
      <CartPanel>
        {cartItems.map((item, index) => {
          const stock = Array.from({ length: item.stock }, (_, index) => index);
          return (
            <ProductDiv key={`${item.id}-${item.size}-${item.color}`}>
              <ProductDetailPanel>
                <ProductImg src={item.image} />
                <ProductDetail>
                  <Text>{item.title}</Text>
                  <Text>{item.id}</Text>
                  <PropertyText>顏色 | {item.color.name}</PropertyText>
                  <PropertyText>尺寸 | {item.size}</PropertyText>
                </ProductDetail>
                <MobileTrashDiv />
              </ProductDetailPanel>
              <MobileTitlePurchaseList>
                <TitleAmount>數量</TitleAmount>
                <TitlePrice>單價</TitlePrice>
                <TitlePrice>小計</TitlePrice>
                {/* <TitleBlank></TitleBlank> */}
              </MobileTitlePurchaseList>
              <PurchaseList>
                <QuantitySelect
                  value={item.qty}
                  onChange={(e) => changeItemQuantity(index, e.target.value)}
                >
                  {stock.map((_, index) => {
                    return <option key={index}>{index + 1}</option>;
                  })}
                </QuantitySelect>
                <PriceDiv>{item.price}</PriceDiv>
                <PriceDiv>{item.price * item.qty}</PriceDiv>
                <TrashDiv onClick={() => deleteItem(index)} />
              </PurchaseList>
            </ProductDiv>
          );
        })}
      </CartPanel>
    </>
  );
}

export default Cart