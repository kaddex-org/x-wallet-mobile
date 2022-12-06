import React, {FC} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

import {TDropdownProps} from './types';
import {styles} from './styles';
import {TouchableOpacity, Text, Platform} from 'react-native';
import CircleXSvg from '../../assets/images/circle-x.svg';

const Dropdown: FC<TDropdownProps> = React.memo(
  ({style, containerStyle, labelStyle, dropDownContainerStyle, ...props}) => {
    return (
      <DropDownPicker
        style={[styles.dropdownStyle, style]}
        containerStyle={[styles.containerStyle, containerStyle]}
        labelStyle={[styles.labelStyle, labelStyle]}
        listMode={Platform.OS === 'android' ? 'MODAL' : 'FLATLIST'}
        dropDownContainerStyle={[
          styles.dropdownContainerStyle,
          dropDownContainerStyle,
        ]}
        CloseIconComponent={() => <CircleXSvg />}
        searchContainerStyle={styles.search}
        modalTitleStyle={styles.modalTitle}
        modalProps={{
          hardwareAccelerated: true,
          animationType: 'slide',
        }}
        modalTitle="Select an item"
        flatListProps={{
          nestedScrollEnabled: true,
          contentContainerStyle: styles.listContainerStyle,
        }}
        renderListItem={({label, value}) => (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.itemStyle}
            onPress={() => {
              props.setValue(value as any);
              props.setOpen(false as any);
            }}>
            <Text style={styles.itemLabelStyle}>{label}</Text>
          </TouchableOpacity>
        )}
        {...props}
      />
    );
  },
);

export default Dropdown;
