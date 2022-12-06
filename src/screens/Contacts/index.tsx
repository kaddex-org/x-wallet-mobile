import React, {useCallback, useState} from 'react';
import {View, TextInput, ScrollView, Text} from 'react-native';

import Header from './components/Header';
import BasicSearchSvg from '../../assets/images/basic-search.svg';
import Item from './components/Item';
import {styles} from './styles';
import ContactDetailsModal from '../../modals/ContactDetailsModal';
import {useDispatch} from 'react-redux';
import {makeSelectContactsList} from '../../store/contacts/selectors';
import {TContact} from './components/Item/types';
import {setSelectedContact} from '../../store/contacts';
import {useShallowEqualSelector} from '../../store/utils';

const Contacts = () => {
  const dispatch = useDispatch();

  const contactsList = useShallowEqualSelector(makeSelectContactsList);
  const [search, setSearch] = useState('');

  const filteredList = contactsList.filter((item: TContact) =>
    item.contactName.includes(search),
  );

  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = useCallback(() => {
    setModalVisible(!isModalVisible);
  }, [isModalVisible]);
  const handlePressItem = useCallback(
    (item: TContact) => () => {
      toggleModal();
      dispatch(setSelectedContact(item));
    },
    [toggleModal],
  );

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.body}>
        <View style={styles.searchSection}>
          <BasicSearchSvg />
          <TextInput
            style={styles.input}
            placeholder="Search contacts"
            value={search}
            onChangeText={setSearch}
          />
        </View>
        <ScrollView
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          style={styles.contactsWrapper}
          contentContainerStyle={styles.contactsContent}>
          <>
            {filteredList.map((item: TContact) => (
              <Item item={item} key={item.id} onPress={handlePressItem(item)} />
            ))}
            {(contactsList || []).length === 0 ? (
              <Text style={styles.emptyList}>No contacts for now</Text>
            ) : null}
          </>
        </ScrollView>
      </View>
      <ContactDetailsModal isVisible={isModalVisible} toggle={toggleModal} />
    </View>
  );
};

export default Contacts;
