import React, {FC} from 'react';
import {Text, View} from 'react-native';

import AlertCircleSvg from '../../assets/images/alert-circle.svg';
import {TWarningProps} from './types';
import {styles} from './styles';

const Warning: FC<TWarningProps> = React.memo(
  ({noIcon, style, centerText, title, isSerious, text}) => {
    return (
      <View
        style={[
          styles.wrapper,
          isSerious && styles.wrapperRed,
          centerText && styles.wrapperCenter,
          centerText && !noIcon && styles.wrapperCenterIcon,
          style,
        ]}>
        {noIcon ? null : (
          <AlertCircleSvg fill={isSerious ? '#212121' : '#CE8900'} />
        )}
        <View
          style={[styles.textWrapper, centerText && styles.textWrapperCenter]}>
          {title && (
            <Text
              style={[
                styles.title,
                isSerious && styles.titleBlack,
                centerText && styles.centerText,
              ]}>
              {title}
            </Text>
          )}
          {text && (
            <Text
              style={[
                styles.title,
                isSerious && styles.titleBlack,
                centerText && styles.centerText,
              ]}>
              {text}
            </Text>
          )}
        </View>
      </View>
    );
  },
);

export default Warning;
