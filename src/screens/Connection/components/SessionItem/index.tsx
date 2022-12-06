import React, {FC, useCallback, useState} from 'react';
import {Text, View, TouchableOpacity, Image, Linking} from 'react-native';
import {TSessionItemProps} from './types';
import {styles} from './styles';
import {truncate} from '../../../../utils/stringHelpers';
import ArrowLeftSvg from '../../../../assets/images/arrow-left.svg';
import SessionDetailsModal from '../../../../modals/SessionDetailsModal';

const SessionItem: FC<TSessionItemProps> = React.memo(
  ({item: sessionItem, onDelete}) => {
    const {logo, name, url} = sessionItem;

    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const onLinkPress = useCallback(() => {
      if (url) {
        Linking.openURL(url);
      }
    }, [url]);

    const toggleModal = useCallback(
      (session?: any) => {
        if (selectedItem) {
          setIsVisible(false);
          setTimeout(() => setSelectedItem(null), 150);
        } else {
          setSelectedItem(session);
          setIsVisible(true);
        }
      },
      [selectedItem],
    );

    return (
      <>
        <View style={styles.wrapper}>
          <TouchableOpacity
            onPress={toggleModal}
            activeOpacity={0.8}
            style={styles.container}>
            <View style={styles.rightSide}>
              {logo ? (
                <View style={styles.iconWrapper}>
                  <Image
                    source={{uri: logo}}
                    style={styles.logo}
                    resizeMode="contain"
                  />
                </View>
              ) : null}
              <View style={styles.center}>
                <Text style={styles.title}>{name}</Text>
                {url ? (
                  <Text onPress={onLinkPress} style={styles.link}>
                    {truncate(url?.split('https://')[1] ?? 'Unknown', 23)}
                  </Text>
                ) : null}
              </View>
            </View>
            <View style={styles.detail}>
              <ArrowLeftSvg fill="#787B8E" width={24} height={24} />
            </View>
          </TouchableOpacity>
        </View>
        <SessionDetailsModal
          details={sessionItem}
          isVisible={isVisible}
          toggle={toggleModal}
          onDelete={onDelete}
        />
      </>
    );
  },
);

export default SessionItem;
