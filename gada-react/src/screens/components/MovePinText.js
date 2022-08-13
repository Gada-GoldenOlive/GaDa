import React from "react";
import styled from "styled-components";

export default function MovePinText() {
  return (
    <ButtonWrapper>
      <ButtonText>핀의 위치를 조정하세요</ButtonText>
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled.div`
  background-color: blue;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0.5px 1px;
  gap: 10px;

  width: 148px;
  height: 26px;

  background: #ffffff;
  /* 버튼 */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
  border-radius: 30px;

  text-align: center;
`;
const ButtonText = styled.p`
  color: black;
  line-height: 18px;
  font-style: normal;
  font-family: "Spoqa Hans Sans Neo";
  font-weight: 400;
  font-size: 14px;
  letter-spacing: -0.02em;
`;
