import React, {useMemo} from 'react';
import styled from 'styled-components';

import { useAppSelector } from '../store';
import { Header } from './Header';
import {ImagePreview} from './ImagePreview';



const ImgContainer = styled.div`
  display: flex;
  gap: 20px;
  overflow-y: hidden;
  overflow-x: auto;
  padding-bottom: 10px;
`

export const ApprovedImagesSlider = () => {
  const approvedImages = useAppSelector(({images}) => images.approved);

  const images = useMemo(() => Array.from(approvedImages), [approvedImages]);
  return (
    <>
    <Header header={`approved images (${approvedImages.size || 0})`} />
    <ImgContainer role='list'>
    {images.map((src, idx) => <ImagePreview src={src} key={idx}/>)}
    </ImgContainer>
    </>
  );
}