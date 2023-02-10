import styled from "styled-components";

const Wrapper=styled.div`
margin: 0 auto;
padding-top:50px ;
height:calc(100vh - 140px - 115px);
`

const Title=styled.h1`
font-size: 40px;
text-align: center;
line-height: 70px;
`
function ThankYou() {

return (
  <Wrapper>
    <Title>謝謝惠顧</Title>
    <Title>歡迎下次再來</Title>
  </Wrapper>
);
}

export default ThankYou;
