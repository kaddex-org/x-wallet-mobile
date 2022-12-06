import {createSlice} from '@reduxjs/toolkit';
import uuid from 'react-native-uuid';

import {TContactsState} from './types';

const initialState: TContactsState = {
  contactsList: [],
  selectedContact: null,
};

const contacts = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setSelectedContact: (state, {payload}) => {
      state.selectedContact = payload;
    },
    createContact: (state, {payload}) => {
      const id = uuid.v4().slice(0, 13) as string;
      state.contactsList.unshift({id, ...payload});
    },
    updateSelectedContact: (state, {payload}) => {
      const selectedContactId = state.selectedContact?.id;
      const idx = state.contactsList.findIndex(
        ({id}) => id === selectedContactId,
      );
      if (idx !== -1) {
        state.contactsList[idx] = {id: selectedContactId, ...payload};
      }
    },
    deleteSelectedContact: state => {
      state.contactsList = state.contactsList.filter(
        ({id}) => id !== state.selectedContact?.id,
      );
    },

    setInitialContactState: state => {
      state.selectedContact = initialState.selectedContact;
      state.contactsList = initialState.contactsList;
    },
  },
});

export const {
  setSelectedContact,
  createContact,
  updateSelectedContact,
  deleteSelectedContact,
  setInitialContactState,
} = contacts.actions;

export default contacts.reducer;
