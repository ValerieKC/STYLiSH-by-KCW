import styled from "styled-components";
import carousel from "./carousel.png";

const CarouselDiv = styled.div`
  width: 100%;
 
  height: 500px;
  background-image: url(${carousel});
  background-size: cover;
  background-position: center;
  position: relative;
  @media screen and (max-width: 1279px) {
    height: 185px;
  }
`;

const TextDiv = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 166px;
  padding-left: 47px;
  font-weight: 100;
  font-size: 30px;
  line-height: 57px;

  @media screen and (max-width: 1279px) {
    max-width: 360px;
    padding-top: 30px;
    padding-left: 23px;
    font-size: 15px;
    line-height: 28px;
  }
`;
const Author = styled.div`
  font-size: 20px;
  line-height: 64px;
  font-weight: 100;
  @media screen and (max-width: 1279px) {
   
    font-size: 12px;
    line-height: 28px;
  }
`;
function Carousel() {
  return (  
      <CarouselDiv>
        <TextDiv>
          於是
          <br />
          我也想要給你
          <br /> 一個那麼美好的自己。
          <Author>不朽《與自己和好如初》</Author>
        </TextDiv>
    </CarouselDiv>
  )
}

export default Carousel;
