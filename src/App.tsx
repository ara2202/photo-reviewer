import styled from "styled-components";
import { Divider } from "antd";
import { Header, ApprovedImagesSlider, ImageController } from "./components";
import { FC } from "react";

const AppBody = styled.div`
  background-color: #3b55e6;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #3b55e6;
`;

const AppContainer = styled.main`
  background-color: #fff;
  border-radius: 8px;
  margin: 0 auto;
  max-width: 800px;
  padding: 50px;
  display: flex;
  flex-direction: column;
`;

const App: FC = () => (
  <AppBody>
    <AppContainer>
      <Header header="image approval application" />
      <Divider />
      <ApprovedImagesSlider />
      <Divider />
      <ImageController />
    </AppContainer>
  </AppBody>
);

export default App;
