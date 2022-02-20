import React, { FC, useCallback } from "react";
import styled from "styled-components";
import { Image, Button, Spin, Alert, Divider } from "antd";
import {
  PlusCircleOutlined,
  CheckOutlined,
  ReloadOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../store";
import { fetchRandomImage, approve, reject } from "../store/imagesSlice";

const ImageContainer = styled.figure`
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

export const ImageController: FC = () => {
  const { image, isLoading, isError } = useAppSelector(({ images }) => images);

  const dispatch = useAppDispatch();

  const handleFetchImage = useCallback(() => {
    dispatch(fetchRandomImage());
  }, [dispatch]);

  const handleApproveClick = useCallback(() => {
    image && dispatch(approve(image.urls.small));
  }, [image, dispatch]);

  const handleRejectClick = useCallback(() => {
    image && dispatch(reject(image.id));
    handleFetchImage();
  }, [image, dispatch, handleFetchImage]);

  return (
    <>
      <ImageContainer>
        {image ? (
          <Image
            src={image.urls.regular}
            height={"100%"}
            alt={image.alt_description || undefined}
          />
        ) : isLoading ? (
          <Spin size="large" data-testid='antd-spinner' />
        ) : isError ? (
          <Alert
            message="Fetching failed"
            showIcon
            description="fetching random image failed for some reason, try again"
            type="error"
            action={
              <Button
                size="middle"
                danger
                onClick={handleFetchImage}
                shape="round"
              >
                Refetch
              </Button>
            }
          />
        ) : (
          <PlusCircleOutlined
            style={{ fontSize: 96, cursor: "pointer" }}
            onClick={handleFetchImage}
          />
        )}
      </ImageContainer>
      <Divider />
      <ButtonContainer>
        <Button
          shape="round"
          size="large"
          icon={<CheckOutlined />}
          onClick={handleApproveClick}
          disabled={!image}
          type="primary"
        >
          Approve
        </Button>
        <Button
          shape="round"
          size="large"
          icon={<ReloadOutlined />}
          onClick={handleFetchImage}
          disabled={isLoading}
        >
          Load another
        </Button>
        <Button
          shape="round"
          size="large"
          icon={<CloseOutlined />}
          onClick={handleRejectClick}
          danger
          disabled={!image}
        >
          Reject
        </Button>
      </ButtonContainer>
    </>
  );
};
