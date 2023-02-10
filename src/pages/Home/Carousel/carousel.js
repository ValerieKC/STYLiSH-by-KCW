import styled from "styled-components";
import carousel from "./carousel.png";

const CarouselDiv = styled.div`
  width: 100%;
  height: 500px;
  background-image: url(${carousel});
  background-size:cover;
  background-position: center;
  position: relative;
`;

const TextDiv=styled.div`
font-size: 30px;
position: absolute;
left:407px;
top:166px;
line-height: 57px;
`
const Author=styled.div`
font-size: 20px;
line-height: 64px;
`
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
