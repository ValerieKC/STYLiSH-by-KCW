import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Swal from "sweetalert2";
import Cart from "./cart";
import tappay from "../../utils/tappay";


const Wrapper = styled.div`
  width: 100%;
  margin:0;
  padding-top: 51px; 
  padding-bottom: 148px;
  
`;
const Container = styled.div`
  margin: 0 auto;
  max-width: 1160px;
  font-size: 16px;
  line-height: 19px;
  @media screen and (max-width: 1279px) {
    
  }
`;

const PaymentPanel = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 1279px) {
    padding:0 30px;
  }
`;

const FormFieldSet = styled.fieldset`
  margin-top: 50px;
`;

const FormLegend = styled.legend`
  line-height: 19px;
  font-size: 16px;
  font-weight: bold;
  color: #3f3a3a;
  padding-bottom: 16px;
  border-bottom: 1px solid #3f3a3a;
  width: 100%;
`;

const FormGroup = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 30px;
  width: 684px;
   @media screen and (max-width: 1279px) {
    line-height: 17px;
    font-size: 14px;
    margin-top: 20px;
    width: 100%;
    ${FormLegend} + & {
      margin-top: 20px;
    }
  }
`;

const FormLabel = styled.label`
  width: 110px;
  line-height: 19px;
  font-size: 16px;
  color: #3f3a3a;
  display: block;
  @media screen and (max-width: 1279px) {
    width: 100%;
  }
`;

const FormControl = styled.input`
  width: 574px;
  height: 30px;
  border-radius: 8px;
  border: solid 1px ${({ invalid }) => (invalid ? "#CB4042" : "#979797")};
  @media screen and (max-width: 1279px) {
    margin-top: 10px;
    width: 100%;
  }
`;

const FormText = styled.div`
  line-height: 19px;
  font-size: 16px;
  color: #8b572a;
  margin-top: 10px;
  width: 100%;
  text-align: right;
`;

const FormCheck = styled.div`
  margin-left: 8px;
  display: flex;
  align-items: center;
  & + & {
    margin-left: 30px;
  }
  @media screen and (max-width: 1279px) {
    margin-left: 0;
    margin-top: 10px;
    & + & {
      margin-left: 27px;
    }
  }
`;

const FormCheckInput = styled.input`
  margin: 0;
  width: 16px;
  height: 16px;
`;

const FormCheckLabel = styled.label`
  margin-left: 10px;
  line-height: 26px;
  @media screen and (max-width: 1279px) {
    font-size: 14px;
  }
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  width: 240px;
  margin-left: auto;
  @media screen and (max-width: 1279px) {
    width: 200px;
  }
`;

const SubtotalPrice = styled(Price)`
  margin-top: 40px;
  @media screen and (max-width: 1279px) {
    margin-top: 24px;
    width:240px;
  }
`;

const ShippingPrice = styled(Price)`
  margin-top: 20px;
  margin-bottom: 20px;
  @media screen and (max-width: 1279px) {
    padding-bottom: 4px;
    width: 240px;
  }
`;

const TotalPrice = styled(Price)`
  padding-top: 20px;
  border-top: 1px solid #3f3a3a;
  @media screen and (max-width: 1279px) {
    margin-top: 20px;
    width: 240px;
  }
`;

const PriceName = styled.div`
  line-height: 19px;
  font-size: 16px;
  color: #3f3a3a;
  @media screen and (max-width: 1279px) {
    line-height: 17px;
    font-size: 14px;
  }
`;

const Currency = styled.div`
  margin-left: auto;
  line-height: 19px;
  font-size: 16px;
  color: #3f3a3a;
`;

const PriceValue = styled.div`
  line-height: 36px;
  margin-left: 10px;
  font-size: 30px;
  color: #3f3a3a;
`;

const Button = styled.button`
  width: 240px;
  height: 60px;
  margin-top: 50px;
  border: solid 1px #979797;
  background-color: black;
  color: white;
  font-size: 20px;
  letter-spacing: 4px;
  margin-left: auto;
  @media screen and (max-width: 1279px) {
    width:100%;
  }
`;

const formInputs = [
  {
    label: "收件人姓名",
    key: "name",
    text: "務必填寫完整收件人姓名，避免包裹無法順利簽收",
  },
  { label: "Email", key: "email" },
  { label: "手機", key: "phone" },
  { label: "地址", key: "address" },
];

const timeOptions = [
  {
    label: "08:00-12:00",
    value: "morning",
  },
  {
    label: "14:00-18:00",
    value: "afternoon",
  },
  {
    label: "不指定",
    value: "anytime",
  },
];

const isMobile = /^(09)[0-9]{8}$/;
const isEmail =
  /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;

function Checkout() {
   const [recipient, setRecipient] = useState({
     name: "",
     email: "",
     phone: "",
     address: "",
     time: "",
   });
   const [cartItems,setCartItems]=useState(JSON.parse(localStorage.getItem("cart")) || [])
   const [invalidFields, setInvalidFields] = useState([]);
   const [loading, setLoading] = useState(false);
   const [subtotal,setSubtotal]=useState(0)
   const navigate = useNavigate();
   const cardNumberRef = useRef();
   const cardExpirationDateRef = useRef();
   const cardCCVRef = useRef();
   const formRef = useRef();
   const { setOrder } = useOutletContext();

   function checkInputFormat(item, e) {
     if (e.target.value === "") return;
     if (item.key === "email") {
       return e.target.value.match(isEmail) ? "" : alert("信箱格式錯誤");
     }
     if (item.key === "phone") {
       return e.target.value.match(isMobile) ? "" : alert("手機格式錯誤");
     }
   }


useEffect(() => {
  const setupTappay = async () => {
    await tappay.setupSDK();
    tappay.setupCard(
      cardNumberRef.current,
      cardExpirationDateRef.current,
      cardCCVRef.current
    );
  };
  setupTappay();
}, []);

let freight;
cartItems.length === 0 ? (freight = 0) : (freight = 30);

async function checkout() {
  try {
    setLoading(true);

      if (cartItems.length === 0) {
        Swal.fire({
          icon: "error",
          title: "錯誤",
          text: "尚未選購商品",         
        });
      return;
    }

    if (Object.values(recipient).some((value) => !value)) {
      Swal.fire({
        icon: "error",
        title: "錯誤",
        text: "請填寫完整訂購資料",
      });
      setInvalidFields(Object.keys(recipient).filter((key) => !recipient[key]));
      formRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }

    if (!tappay.canGetPrime()) {
      Swal.fire({
        icon: "error",
        title: "錯誤",
        text: "付款資料輸入有誤",
      });
      return;
    }

    const result = await tappay.getPrime();
    if (result.status !== 0) {
      Swal.fire({
        icon: "error",
        title: "錯誤",
        text: "付款資料輸入有誤",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "YA!",
      text: "付款成功",
    });
    setCartItems([]);
    setOrder(0)
    localStorage.setItem("cart", JSON.stringify([]));
    navigate("/thankyou");
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
}

  return (
    <Wrapper>
      <Container>
        <Cart
          cartItems={cartItems}
          setCartItems={setCartItems}
          setSubtotal={setSubtotal}
        />
        <PaymentPanel>
          <form ref={formRef}>
            <FormFieldSet>
              <FormLegend>訂購資料</FormLegend>
              {formInputs.map((input) => (
                <FormGroup key={input.key}>
                  <FormLabel>{input.label}</FormLabel>
                  <FormControl
                    value={recipient[input.key]}
                    onChange={(e) =>
                      setRecipient({
                        ...recipient,
                        [input.key]: e.target.value,
                      })
                    }
                    onBlur={(e) => {
                      checkInputFormat(input, e);
                      return;
                    }}
                    invalid={invalidFields.includes(input.key)}
                  />
                  {input.text && <FormText>{input.text}</FormText>}
                </FormGroup>
              ))}
              <FormGroup>
                <FormLabel>配送時間</FormLabel>
                {timeOptions.map((option) => {
                  return (
                    <FormCheck key={option.value}>
                      <FormCheckInput
                        type="radio"
                        // checked={recipient.time === option.value}
                        onChange={(e) => {
                          if (e.target.checked)
                            setRecipient({ ...recipient, time: option.value });
                        }}
                      />
                      <FormCheckLabel>{option.label}</FormCheckLabel>
                    </FormCheck>
                  );
                })}
              </FormGroup>
            </FormFieldSet>
            <FormFieldSet>
              <FormLegend>付款資料</FormLegend>
              <FormGroup>
                <FormLabel>信用卡號碼</FormLabel>
                <FormControl as="div" ref={cardNumberRef} />
              </FormGroup>
              <FormGroup>
                <FormLabel>有效期限</FormLabel>
                <FormControl as="div" ref={cardExpirationDateRef} />
              </FormGroup>
              <FormGroup>
                <FormLabel>安全碼</FormLabel>
                <FormControl as="div" ref={cardCCVRef} />
              </FormGroup>
            </FormFieldSet>
          </form>
          <SubtotalPrice>
            <PriceName>總金額</PriceName>
            <Currency>NT.</Currency>
            <PriceValue>{subtotal}</PriceValue>
          </SubtotalPrice>
          <ShippingPrice>
            <PriceName>運費</PriceName>
            <Currency>NT.</Currency>
            <PriceValue>{freight}</PriceValue>
          </ShippingPrice>

          <TotalPrice>
            <PriceName>應付金額</PriceName>
            <Currency>NT.</Currency>
            <PriceValue>{subtotal + freight}</PriceValue>
          </TotalPrice>
          <Button onClick={checkout}>結帳</Button>
        </PaymentPanel>
      </Container>
    </Wrapper>
  );
}

export default Checkout;
