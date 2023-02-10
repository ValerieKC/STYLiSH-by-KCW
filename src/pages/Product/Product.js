import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/api";
import ProductVariants from "./ProductVariants"

const Wrapper = styled.div`
  width: 100%;
  color: #3f3a3a;
`;

const Container = styled.div`
  width: 960px;
  margin: 65px auto 49px;
  display: flex;
  flex-direction: column;
`;

const ProductInformDiv = styled.div`
  display: flex;
  column-gap: 40px;
`;
const ProductImg = styled.img`
  width: 560px;
  height: 746.67px;
`;
const ProductSelectPanel = styled.div`
  display: flex;
  flex-direction: column;
`;
const ProductTitle = styled.div`
font-size: 32px;
line-height: 38px;
letter-spacing: 6.4px;
`;
const ProductId = styled.div`
margin-top: 16px;
margin-bottom: 40px;
font-size: 20px;
line-height: 24px;
letter-spacing: 4px;
color: #BABABA;
;
`;
const ProductPrice = styled.div`
font-size: 30px;
line-height: 36px;
`;
const Split = styled.div`
margin-top: 20px;
margin-bottom: 30px;
  width: 100%;
  height: 1px;
  background-color: #3f3a3a; 
`;

const ProductDetailText=styled.div`
margin-top: 40px;
font-size: 20px;
line-height: 30px;
`

const ProductDescription=styled.div`
margin-top: 50px;
/* margin-bottom: 28px; */
display: flex;
flex-direction: column;
row-gap: 30px;
`
const DescriptionTitleDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const DescriptionTitle = styled.div`
font-size: 20px;
line-height: 30px;
letter-spacing: 3px;
color: #8B572A;
;
`;
const DescriptionSplit=styled.div`
width: calc(100% - 135px - 64px);
height:1px;
background-color: #3f3a3a;
`
const DescriptionText=styled.div`
font-size: 20px;
line-height: 30px;
`
const ProductPhotoDiv=styled.img`
width:100%;
height:540px;
`
function Product() {
  const [product, setProduct] = useState();
  const { id } = useParams();

  useEffect(() => {
    async function getProduct() {
      const { data } = await api.getProduct(id);
      setProduct(data);
    }
    getProduct();
  }, [id]);
  if (!product) return null;
  return (
    <Wrapper>
      <Container>
        <ProductInformDiv>
          <ProductImg src={product.main_image} />
          <ProductSelectPanel>
            <ProductTitle>{product.title}</ProductTitle>
            <ProductId>{product.id}</ProductId>
            <ProductPrice>TWD.{product.price}</ProductPrice>
            <Split />
            <ProductVariants product={product} />

            <ProductDetailText>
              實品顏色依單品照為主
              <br />
              <br />
              {product.texture}
              <br />
              {product.description}
              <br />
              <br />
              清洗：{product.wash}
              <br />
              產地：{product.place}
            </ProductDetailText>
          </ProductSelectPanel>
        </ProductInformDiv>
        <ProductDescription>
          <DescriptionTitleDiv>
            <DescriptionTitle>更多產品資訊</DescriptionTitle>
            <DescriptionSplit />
          </DescriptionTitleDiv>
          <DescriptionText>
            {product.story}
          </DescriptionText>
          {product.images.map((photo, index) => {
            return <ProductPhotoDiv key={`${photo}-${index}`} src={photo} />;
          })}
        </ProductDescription>
      </Container>
    </Wrapper>
  );
}

export default Product;
