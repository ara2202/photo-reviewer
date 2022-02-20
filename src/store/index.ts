import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {
  persistReducer,
  createTransform,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import imagesReducer, { ImagesState } from './imagesSlice';

type EndSubState = Omit<ImagesState, 'approved' | 'rejected'> & {approved: string[], rejected: string[]};
 
const SetTransform = createTransform<ImagesState, EndSubState, {images: ImagesState}>(
  (inboundState) => ({ ...inboundState, approved: [...inboundState.approved], rejected: [...inboundState.rejected], isLoading: false, isError: false, errorMessage: null}),
  (outboundState) => ({ ...outboundState, approved: new Set(outboundState.approved), rejected: new Set(outboundState.rejected) }),
  { whitelist: ['images'] }
);
 

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  transforms: [SetTransform],
}

const rootReducer = combineReducers({images: imagesReducer });

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, 'images/approve', 'images/reject', 'images/fetchRandom/pending', 'images/fetchRandom/fulfilled'],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector