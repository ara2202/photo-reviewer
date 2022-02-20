import React, {FC} from 'react';
import styled from 'styled-components';

const HeaderTag = styled.h2`
  text-transform: uppercase;
  padding: 5px 10px;
  color: #3B55E6;
  font-size: 20px;
`

type HeaderProps = {
  header: string;
}

export const Header: FC<HeaderProps> = ({header}) => <HeaderTag>{header}</HeaderTag>;