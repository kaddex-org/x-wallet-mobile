import React, {FC, useCallback} from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';
import TabButton from './TabButton';
import {TRadioTabProps, TRadioTabValue} from './types';

const RadioTab: FC<TRadioTabProps> = React.memo(
  ({
    options,
    value,
    onChange,
    label,
    labelStyle,
    buttonStyle,
    buttonsWrapperStyle,
  }) => {
    const handlePress = useCallback(
      (tabValue: TRadioTabValue) => () => {
        onChange && onChange(tabValue);
      },
      [onChange],
    );
    return (
      <View style={styles.wrapper}>
        {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
        <View style={[styles.optionWrapper, buttonsWrapperStyle]}>
          {options.map(item => (
            <TabButton
              key={item.value}
              title={item.label}
              isActive={value === item.value}
              onPress={handlePress(item.value)}
              buttonStyle={buttonStyle}
            />
          ))}
        </View>
      </View>
    );
  },
);

export default RadioTab;
