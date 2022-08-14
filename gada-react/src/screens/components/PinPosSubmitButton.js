import React from "react";
import styled from "styled-components";

const PinPosSubmitButton = () => {
  return (
    <ButtonWrapper>
      <ButtonText>확인</ButtonText>
    </ButtonWrapper>
  );
};

export default PinPosSubmitButton;

const ButtonWrapper = styled.div`
  background-color: #49d592;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0.5px 1px;
  gap: 10px;

  width: 77px;
  height: 34px;

  /* 버튼 */

  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.25);
  border-radius: 17px;

  text-align: center;
`;
const ButtonText = styled.p`
  color: white;
  line-height: 16px;
  font-style: normal;
  font-family: "Spoqa Han Sans Neo";
  font-weight: 500;
  font-size: 16px;
  letter-spacing: -0.02em;
`;
