import styled from "styled-components";

const FooterDiv = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  height: 115px;
  background-color: #313538;
  @media screen and (max-width: 1279px) {
    display: none;
  }
`;
export default function Footer() {
  return <FooterDiv />;
}
