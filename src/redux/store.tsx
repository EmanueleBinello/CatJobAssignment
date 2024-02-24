import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { catFactsAppDataReducer } from './slices/CatFactAppDataSlice';


export const store = configureStore({
  reducer: {
    catFactsAppData: catFactsAppDataReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
