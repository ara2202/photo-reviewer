import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { Photo } from "../api/types";
import { UnsplashAPI } from "../api/unsplash";

export type ImagesState = {
  approved: Set<string>;
  rejected: Set<string>;
  isLoading: boolean;
  isError: boolean;
  image: Photo | null;
};

export const initialState: ImagesState = {
  approved: new Set([]),
  rejected: new Set([]),
  isLoading: false,
  isError: false,
  image: null,
};

const MAX_RETRIES = 10;

export const fetchRandomImage = createAsyncThunk<
  Photo | null,
  void,
  { state: RootState }
>("images/fetchRandom", async (_: void, { getState }) => {
  let finishCycle = false;
  let retries = 0;
  let photo: Photo | null = null;
  while (!finishCycle) {
    retries += 1;
    const response = await UnsplashAPI.fetchRandomPhoto();
    photo = response.data;

    if (
      retries >= MAX_RETRIES ||
      !getState().images.rejected.has(response.data.id)
    ) {
      finishCycle = true;
      photo = response.data;
    }
  }
  if (retries >= MAX_RETRIES) {
    return Promise.reject('failed to fetch non-rejected image');
  }
  return photo;
});

export const imagesSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    approve: (state, action: PayloadAction<string>) => {
      const { approved } = state;
      approved.add(action.payload);
      state.image = null;
    },
    reject: (state, action: PayloadAction<string>) => {
      state.rejected.add(action.payload);
      state.image = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRandomImage.fulfilled, (state, { payload }) => {
      if (payload) {
        state.image = payload;
        state.isError = false;
        state.isLoading = false;
      } else {
        state.isError = true;
      }
    });

    builder.addCase(fetchRandomImage.pending, (state) => {
      state.image = null;
      state.isError = false;
      state.isLoading = true;
    });

    builder.addCase(fetchRandomImage.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
    });
  },
});

export const { approve, reject } = imagesSlice.actions;

export default imagesSlice.reducer;
