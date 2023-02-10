import styled, { keyframes } from "styled-components";
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "../../utils/api";


const Wrapper = styled.div`
  width: 100%;
`;
const Container = styled.div`
  margin: 70px auto 110px;
  /* width: 1160px; */
  max-width: 1200px;
  display: flex;
  flex-wrap: wrap;
  column-gap: 40px;
  row-gap: 64px;
  @media screen and (max-width: 1279px) {
    margin: 15px auto 30px;
    width: calc(100% - 48px);
    column-gap: 6px;
    row-gap: 24px;
  }
`;

const ProductDiv = styled(Link)`
  width: calc((100% - 80px) / 3);
  text-decoration: none;
  @media screen and (max-width: 1279px) {
    width: calc((100% - 6px) / 2);
  }
`;

const ProductImg = styled.img`
  width: 100%;
  
`;
const ColorDiv = styled.div`
  margin-top: 20px;
  display: flex;
  width: fit-content;
  height: fit-content;
  column-gap: 10px;
`;

const ColorSquare = styled.div`
  width: 24px;
  height: 24px;
  border: #d3d3d3;
  background-color: #${(props) => props.colorCode};
  cursor: pointer;
  @media screen and (max-width: 1279px) {
    width: 12px;
    height: 12px;
  }
`;
const ProductText = styled.div`
  margin-top: 20px;
  margin-bottom: 10px;
  color: #3f3a3a;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 4px;
  @media screen and (max-width: 1279px) {
    margin-top: 10px;
    margin-bottom: 8px;
    font-size: 12px;
    line-height: 14px;
    letter-spacing: 2.4px;
  }
`;
const ProductPrice = styled.div`
  color: #3f3a3a;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 4px;
  @media screen and (max-width: 1279px) {
    font-size: 12px;
    line-height: 14px;
    letter-spacing: 2.4px;
  }
`;

const Animation = keyframes`
   0% {
    background-color: hsl(200, 20%, 80%);
  }
  100% {
    background-color: hsl(200, 20%, 95%);
  }
`;

const LoadingDiv = styled.div`
  height: 604.5px;
`;
const LoadingImg = styled.div`
  width: 360px;
  height: 480px;
  animation: ${Animation} 0.5s linear infinite alternate;
`;

const LoadingColorDiv = styled(ColorDiv)`
  
`;

const LoadingColorSquare = styled(ColorSquare)`
  animation: ${Animation} 0.5s linear infinite alternate;
`;

const skeletonDivNum = Array.from({ length: 6 }, (_, index) => index);

const skeletonColorDivNum = Array.from({ length: 3 }, (_, index) => index);

function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const keyword = searchParams.get("keyword");
  const category = searchParams.get("category") || "all";

  useEffect(() => {
    let nextPaging = 0;
    let isFetching = false;
    async function fetchProducts() {
      isFetching = true;
      setIsLoading(true);
      const response = keyword
        ? await api.searchProducts(keyword, nextPaging)
        : await api.getProducts(category, nextPaging);
      if (nextPaging === 0) {
        setProducts(response.data);
      } else {
        setProducts((prev) => [...prev, ...response.data]);
      }
      nextPaging = response.next_paging;
      isFetching = false;
      setIsLoading(false);
    }

    async function scrollHandler() {
      if (window.innerHeight + window.scrollY - document.body.offsetHeight <= 10) {
        if (nextPaging === undefined) return;
        if (isFetching) return;

        fetchProducts();
      }
    }
    fetchProducts();

    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, [category, keyword]);
  return (
    <Wrapper>
      <Container>
        {isLoading&&products.length===0
          && skeletonDivNum.map((item) => {
              return (
                <LoadingDiv key={item}>
                  <LoadingImg />
                  <LoadingColorDiv>
                    {skeletonColorDivNum.map((item) => {
                      return <LoadingColorSquare key={item} />;
                    })}
                  </LoadingColorDiv>
                </LoadingDiv>
              );
            })}
           {products?.map(({ id, main_image, colors, title, price }) => {
              return (
                <ProductDiv key={id} to={`/products/${id}`}>
                  <ProductImg src={main_image} />
                  <ColorDiv>
                    {colors.map(({ code }) => {
                      return <ColorSquare colorCode={`${code}`} key={code} />;
                    })}
                  </ColorDiv>
                  <ProductText>{title}</ProductText>
                  <ProductPrice>TWD.{price}</ProductPrice>
                </ProductDiv>
              );
            })}
      </Container>
     </Wrapper>
  );
}

export default Products;
