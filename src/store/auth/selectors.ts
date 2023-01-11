import {createSelector} from '@reduxjs/toolkit';

import {RootState} from '../store';

const selectedState = (state: RootState) => state.auth;

export const makeSelectPinCode = createSelector(
  selectedState,
  state => state.pinCode,
);

export const makeSelectNewPinCode = createSelector(
  selectedState,
  state => state.newPinCode,
);

export const makeSelectIsAuthorized = createSelector(
  selectedState,
  state => state.isAuthorized,
);

export const makeSelectHashPassword = createSelector(
  selectedState,
  state => state.password,
);

export const makeSelectGeneratedPhrases = createSelector(
  selectedState,
  state => {
    const list = state.generatedPhrasesState.data;
    return (list && list.join(' ')) || '';
  },
);

export const makeSelectGeneratedPhrasesLoading = createSelector(
  selectedState,
  state => state.generatedPhrasesState.fetching,
);

export const makeSelectIs2FaAdded = createSelector(
  selectedState,
  state => state.is2FaAdded,
);
