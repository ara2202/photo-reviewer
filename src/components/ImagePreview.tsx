import React, { FC, useState } from "react";
import { Image } from "antd";
import styled from "styled-components";


const ImgPreview = styled.div<{ backgroundImage: string }>`
  position: relative;
  border-radius: 4px;
  width: 160px;
  height: 80px;
  background-image: url(${(props) => props.backgroundImage});
  background-size: cover;
  background-position: center;
  cursor: pointer;
`;


type ImagePreviewProps = {
  src: string;
};

export const ImagePreview: FC<ImagePreviewProps> = ({ src }) => {
  const [visible, setVisible] = useState(false);
  

  return (
    <ImgPreview backgroundImage={src} onClick={()=> setVisible(true)} role='listitem'>    
      <Image
        width={160}
        style={{ display: "none", position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
        src={src}
        preview={{
          src,
          visible,
          onVisibleChange: setVisible,
        }}
      />
    </ImgPreview>
  );
};
