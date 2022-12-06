import {createSelector} from '@reduxjs/toolkit';

import {RootState} from '../store';

const selectedState = (state: RootState) => state.contacts;

export const makeSelectContactsList = createSelector(
  selectedState,
  state => state.contactsList,
);

export const makeSelectSelectedContact = createSelector(
  selectedState,
  state => state.selectedContact,
);
