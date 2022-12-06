import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TAuthState} from './types';
import {defaultRequestValues} from '../const';

const initialState: TAuthState = {
  password: null,
  pinCode: null,
  newPinCode: null,
  isAuthorized: false,
  is2FaAdded: false,
  generatedPhrasesState: defaultRequestValues,
};

export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setPassword: (state, {payload}) => {
      state.password = payload;
      state.pinCode = null;
      state.newPinCode = null;
      state.generatedPhrasesState.data = null;
    },
    changePassword: (state, {payload}) => {
      state.password = payload;
    },
    setPhrases: (state, {payload}) => {
      state.generatedPhrasesState.data = payload;
    },
    storePinCode: (state, {payload}) => {
      state.pinCode = payload;
    },
    setNewPinCode: (state, {payload}) => {
      state.newPinCode = payload;
    },
    login: state => {
      state.isAuthorized = true;
    },
    signOut: state => {
      state.isAuthorized = false;
    },
    setGeneratedPhrasesLoading: (state, {payload}) => {
      state.generatedPhrasesState.fetching = payload;
    },
    setGeneratedPhrasesSuccess: (state, {payload}) => {
      state.generatedPhrasesState.data = payload;
    },
    setGeneratedPhrasesError: (state, {payload}) => {
      state.generatedPhrasesState.error = payload;
    },
    setInitialAuthState: state => {
      state.password = initialState.password;
      state.pinCode = initialState.pinCode;
      state.newPinCode = initialState.newPinCode;
      state.isAuthorized = initialState.isAuthorized;
      state.generatedPhrasesState = initialState.generatedPhrasesState;
    },
    setIs2FaAdded: (state, {payload}: PayloadAction<boolean>) => {
      state.is2FaAdded = payload;
    },
  },
});

export const {
  setPassword,
  changePassword,
  storePinCode,
  login,
  signOut,
  setPhrases,
  setNewPinCode,
  setGeneratedPhrasesError,
  setGeneratedPhrasesLoading,
  setGeneratedPhrasesSuccess,
  setInitialAuthState,
  setIs2FaAdded,
} = auth.actions;

export default auth.reducer;
