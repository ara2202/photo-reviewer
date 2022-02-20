import React, { FC } from "react";
import styled from "styled-components";

const HeaderTag = styled.h1<Pick<HeaderProps, "fontSize">>`
  text-transform: uppercase;
  padding: 5px 10px;
  color: #3b55e6;
  font-size: ${(props) => props.fontSize || 20}px;
`;

type HeaderProps = {
  header: string;
  tag?: "h1" | "h2" | "h3";
  fontSize?: number;
};

export const Header: FC<HeaderProps> = ({ header, fontSize, tag = "h1" }) => (
  <HeaderTag as={tag} fontSize={fontSize}>
    {header}
  </HeaderTag>
);
