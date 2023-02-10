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
`;
const TitleAmount = styled.div`
  width: 80px;
  margin-right: 56px;
  text-align: center;
`;
const TitlePrice = styled.div`
  width: 192px;
  display: flex;
  justify-content: center;
  align-items: center;
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
`;
const ProductDiv = styled.div`
  display: flex;
  justify-content: space-between;
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
`;
const QuantitySelect = styled.select`
  width: 80px;
  height: 30px;
  padding-left: 17px;
  margin-right: 56px;
  border-radius: 8px;
  border: solid 1px #979797;
  background-color: #f3f3f3;
`;

const PriceDiv = styled.div`
  width: 192px;
  height: 16px;
  display: flex;
  justify-content: center;
`;

const TrashDiv = styled.div`
  width: 44px;
  height: 44px;
  background-image: url(${deleteSign});
  cursor: pointer;
  &:hover {
    background-image: url(${deleteHover});
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
  return(
  <>
    <Title>
      <TitleCart>購物車({cartItems.length})</TitleCart>
      <PurchaseList>
        <TitleAmount>數量</TitleAmount>
        <TitlePrice>單價</TitlePrice>
        <TitlePrice>小計</TitlePrice>
        <TitleBlank></TitleBlank>
      </PurchaseList>
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
            </ProductDetailPanel>
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
  )
}

export default Cart