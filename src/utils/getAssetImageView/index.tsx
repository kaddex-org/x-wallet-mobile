import React from 'react';
import {Image, View} from 'react-native';
import BabenaIcon from '../../assets/images/babena-icon.svg';
import BackAlleyIcon from '../../assets/images/backalley-icon.svg';
import HypeIcon from '../../assets/images/hype-icon.svg';
import JdeIcon from '../../assets/images/jde-icon.svg';
import KapyIcon from '../../assets/images/kapy-icon.svg';
import KaycIcon from '../../assets/images/kayc-icon.svg';
import KDAIcon from '../../assets/images/kda-icon.svg';
import KDLIcon from '../../assets/images/kdl-icon.svg';
import KDSIcon from '../../assets/images/kds-icon.svg';
import KDXIcon from '../../assets/images/kdx-icon.svg';
import KishuIcon from '../../assets/images/kishu-icon.svg';
import LagoBTCIcon from '../../assets/images/lagoBTC-icon.svg';
import WalletIcon from '../../assets/images/logo.svg';
import MokIcon from '../../assets/images/mok-icon.svg';
import {styles} from './styles';

export const getAssetImageView = (tokenAddress: string, size = 40) => {
  switch (tokenAddress) {
    case 'coin':
      return (
        <View style={[styles.image, {width: size, height: size}]}>
          <KDAIcon height={size} width={size} />
        </View>
      );
    case 'kaddex.kdx':
      return (
        <View style={[styles.image, {width: size, height: size}]}>
          <KDXIcon height={size} width={size} />
        </View>
      );
    case 'free.backalley':
    case 'free.backalley-token':
      return (
        <View style={styles.imageNoRadius}>
          <BackAlleyIcon height={size} width={size} />
        </View>
      );
    case 'kdlaunch.token':
      return (
        <View style={[styles.image, {width: size, height: size}]}>
          <KDLIcon height={size} width={size} />
        </View>
      );
    case 'kdlaunch.kdswap-token':
      return (
        <View style={[styles.image, {width: size, height: size}]}>
          <KDSIcon height={size} width={size} />
        </View>
      );
    case 'free.babena':
      return (
        <View style={[styles.image, {width: size, height: size}]}>
          <View style={styles.defaultImageBackground}>
            <BabenaIcon height="24" width="24" />
          </View>
        </View>
      );
    case 'hypercent.prod-hype-coin':
      return (
        <View style={[styles.image, {width: size, height: size}]}>
          <HypeIcon height={size} width={size} />
        </View>
      );
    case 'runonflux.flux':
    case 'kdlaunch.runonflux.flux':
      return (
        <Image
          source={require('../../assets/images/flux-icon.png')}
          style={[styles.image, {width: size, height: size}]}
        />
      );
    case 'kaddex.skdx':
      return (
        <Image
          source={require('../../assets/images/sdkx-icon.png')}
          style={[styles.image, {width: size, height: size}]}
        />
      );
    case 'lago.kwUSDC':
      return (
        <Image
          source={require('../../assets/images/usdc-icon.png')}
          style={[styles.image, {width: size, height: size}]}
        />
      );
    case 'lago.kwBTC':
      return (
        <View style={[styles.image, {width: size, height: size}]}>
          <LagoBTCIcon height={size} width={size} />
        </View>
      );
    case 'arkade.token':
      return (
        <Image
          source={require('../../assets/images/arkade-icon.png')}
          style={[styles.image, {width: size, height: size}]}
        />
      );
    case 'free.kishu-ken':
      return (
        <View style={[styles.image, {width: size, height: size}]}>
          <KishuIcon height={size} width={size} />
        </View>
      );
    case 'free.KAYC':
      return (
        <View style={[styles.image, {width: size, height: size}]}>
          <KaycIcon fill="#000000" height={size} width={size} />
        </View>
      );
    case 'free.anedak':
      return (
        <View style={[styles.image, {width: size, height: size}]}>
          <View style={styles.defaultImageBackground}>
            <Image
              source={require('../../assets/images/anedak-icon.png')}
              style={styles.imageContent}
            />
          </View>
        </View>
      );
    case 'lago.USD2':
      return (
        <Image
          source={require('../../assets/images/lago-icon.png')}
          style={[styles.image, {width: size, height: size}]}
        />
      );
    case 'mok.token':
      return (
        <View style={[styles.image, {width: size, height: size}]}>
          <MokIcon height={size} width={size} />
        </View>
      );
    case 'free.kapybara-token':
      return (
        <View style={[styles.image, {width: size, height: size}]}>
          <KapyIcon height={size} width={size} />
        </View>
      );

    case 'free.jodie-token':
      return (
        <View style={[styles.image, {width: size, height: size}]}>
          <JdeIcon height={size} width={size} />
        </View>
      );
    default:
      return (
        <View style={[styles.image, {width: size, height: size}]}>
          <View
            style={[
              styles.defaultImageBackground,
              {width: size, height: size},
            ]}>
            <WalletIcon
              height={size === 40 ? 24 : size - 10}
              width={size === 40 ? 24 : size}
            />
          </View>
        </View>
      );
  }
};
