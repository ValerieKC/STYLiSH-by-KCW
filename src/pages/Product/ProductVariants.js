import styled from "styled-components";
import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";

const ProductOptionDiv = styled.div`
  display: flex;
  margin-bottom: 30px;
  @media screen and (max-width:1279px){
    /* width:100%; */
  }
`;
const ProductOptionText = styled.div`
  margin-right: 24px;
  display: flex;
  align-items: center;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 4px;
  @media screen and (max-width: 1279px) {
    margin-right: 24px;
    width: 68px;

    line-height: 17px;
    font-size: 14px;
    letter-spacing: 2.8px;
  }
`;
const ProductOptionPanel = styled.div`
  display: flex;
  @media screen and (max-width: 1279px) {
    width: 100%;
  }
`;
const ColorOuterSquare = styled.div`
margin-right: 20px;
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${(props) => (props.isSelected ? "1px solid #d3d3d3" : "none")};
`;
const ColorInnerSquare = styled.div`
  width: 24px;
  height: 24px;
  border: 1px solid #d3d3d3;
  background-color: #${(props) => props.color};
  cursor: pointer;
`;

const SizeCirclePanel = styled.div`
display: flex;
`;

const SizeCircle = styled.div`
  width: 36px;
  height: 36px;
  margin-right: 20px;
  border-radius: 50%;
  background-color: #000000;
  background-color: ${(props) => (props.isSelected ? "#000000" : "#ECECEC")};

  color: ${(props) => (props.isSelected ? "white" : "#3f3a3a")};
  font-size: 20px;
  line-height: 36px;
  text-align: center;
  cursor: ${(props) => (props.$isDisabled ? " not-allowed" : "pointer")};
  opacity: ${(props) => (props.isDisabled ? "0.25" : "1")};
`;

const AmountSelectDiv = styled.div`
  /* width: 100%; */
  width: 160px;
  height: 44px;
  display: flex;
  justify-content: space-between;
  border: 1px solid #979797;
  @media screen and (max-width: 1279px) {
    width: 100%;
  }
`;

const AmountSelectBtn = styled.div`
  height: 100%;
  width: 30px;
  line-height: 44px;
  text-align: center;
  cursor: pointer;
  @media screen and (max-width: 1279px) {
    width: 70px;
  }
`;
const AmountSelectNumber = styled.div`
  width: 100px;
  font-size: 16px;
  line-height: 44px;
  color: #8b572a;
  text-align: center;
  @media screen and (max-width: 1279px) {
    width: 100%;
  }
`;

const AddToCartBtn = styled.div`
  width: 360px;
  height: 64px;
  background-color: #000000;
  border: 1px solid #979797;
  font-size: 20px;
  letter-spacing: 4px;
  line-height: 64px;
  color: #ffffff;
  text-align: center;
  cursor: pointer;
  @media screen and (max-width: 1279px) {
    width: 100%;
  }
`;

function ProductVariants({ product }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0].code);
  const [selectedSize, setSelectedSize] = useState();
  const [quantity, setQuantity] = useState(1);
  const { setOrder } = useOutletContext();


  function getStock(colorCode, size) {
    if (!size) return;
    return product.variants.find(
      (variant) => variant.color_code === colorCode && variant.size === size
    ).stock;
  }
  function addToCart() {
    if (!selectedSize) {
      Swal.fire({
        icon: "error",
        text: "請選擇尺寸",
      });
      return;
    }

    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    const result = cartItems.find(
      (item) => item.color.code === selectedColor && item.size === selectedSize
    );
    if (result) {
      Swal.fire({
        icon: "warning",
        text: "此商品已在購物車囉！",
      });
      return;
    }

    const newCartItems = [
      ...cartItems,
      {
        color: product.colors.find((color) => color.code === selectedColor),
        id: product.id,
        image: product.main_image,
        name: product.title,
        price: product.price,
        qty: quantity,
        size: selectedSize,
        stock: getStock(selectedColor, selectedSize),
      },
    ];
    localStorage.setItem("cart", JSON.stringify(newCartItems));
    setOrder(prev=>prev+1)
    Swal.fire({
      icon: "success",
      text: "已加入商品！",
    });
  }

  return (
    <>
      <ProductOptionDiv>
        <ProductOptionText>顏色 | </ProductOptionText>
        <ProductOptionPanel>
          {product.colors.map((item) => {
            return (
              <ColorOuterSquare
                key={item.code}
                isSelected={selectedColor === item.code}
              >
                <ColorInnerSquare
                  color={item.code}
                  onClick={() => {
                    setSelectedColor(item.code);
                    setSelectedSize();
                  }}
                ></ColorInnerSquare>
              </ColorOuterSquare>
            );
          })}
        </ProductOptionPanel>
      </ProductOptionDiv>
      <ProductOptionDiv>
        <ProductOptionText>尺寸 | </ProductOptionText>
        <SizeCirclePanel>
          {product.sizes.map((item) => {
            const stock = getStock(selectedColor, item);
            return (
              <SizeCircle
                key={item}
                isSelected={item === selectedSize}
                isDisabled={stock === 0}
                onClick={() => {
                  const stock = getStock(selectedColor, item);
                  if (stock === 0) return;
                  setSelectedSize(item);
                  if (stock < quantity) setQuantity(1);
                }}
              >
                {item}
              </SizeCircle>
            );
          })}
        </SizeCirclePanel>
      </ProductOptionDiv>
      <ProductOptionDiv>
        <ProductOptionText>數量 | </ProductOptionText>
        <ProductOptionPanel>
          <AmountSelectDiv>
            <AmountSelectBtn
              onClick={() => {
                if (!selectedSize || quantity === 1) return;
                setQuantity(quantity - 1);
              }}
            >
              -
            </AmountSelectBtn>
            <AmountSelectNumber>{quantity}</AmountSelectNumber>
            <AmountSelectBtn
              onClick={() => {
                const stock = getStock(selectedColor, selectedSize);
                if (!selectedSize || quantity === stock) return;
                setQuantity(quantity + 1);
              }}
            >
              +
            </AmountSelectBtn>
          </AmountSelectDiv>
        </ProductOptionPanel>
      </ProductOptionDiv>
      <AddToCartBtn onClick={addToCart}>
        {selectedSize ? "加入購物車" : "請選擇尺寸"}
      </AddToCartBtn>
    </>
  );
}

export default ProductVariants;
