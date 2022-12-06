import {Platform, StyleSheet, Text} from 'react-native';

export const enableTypography = () => {
  // @ts-ignore
  const TextRender = Text.render;
  // @ts-ignore
  const initialDefaultProps = Text.defaultProps;
  // @ts-ignore
  Text.defaultProps = {
    ...initialDefaultProps,
    style: StyleSheet.flatten(getTextFont(initialDefaultProps?.style)),
  };
  // @ts-ignore
  Text.render = function render(props) {
    let oldProps = props;
    props = {...props, style: StyleSheet.flatten(getTextFont(props.style))};
    try {
      return TextRender.apply(this, arguments);
    } finally {
      props = oldProps;
    }
  };
};

export const getFontFamily = (fontFamily: string) => {
  if (Platform.OS === 'android') {
    return fontFamily.replace('-', '_');
  }
  return fontFamily;
};

export const getNormalFontFamily = (fontFamily: string) => {
  return fontFamily?.replace('_', '-') || '';
};

export const getFontWeight = (fontWeight: string) => {
  if (Platform.OS === 'android') {
    return 'normal';
  }
  return fontWeight;
};

export const getTextFont = (style: any) => {
  const styleObject = StyleSheet.flatten(style);
  switch (getNormalFontFamily(styleObject?.fontFamily)) {
    case 'Montserrat-Regular':
      return {
        ...styleObject,
        fontWeight: getFontWeight(styleObject?.fontWeight || 'normal'),
        fontFamily: getFontFamily('Montserrat-Regular'),
      };
    case 'Montserrat-Bold':
      return {
        ...styleObject,
        fontWeight: getFontWeight(styleObject?.fontWeight || 'normal'),
        fontFamily: getFontFamily('Montserrat-Bold'),
      };
    case 'Montserrat-ExtraBold':
      return {
        ...styleObject,
        fontWeight: getFontWeight(styleObject?.fontWeight || 'normal'),
        fontFamily: getFontFamily('Montserrat-Bold'),
      };
    case 'Montserrat-SemiBold':
      return {
        ...styleObject,
        fontWeight: getFontWeight(styleObject?.fontWeight || 'normal'),
        fontFamily: getFontFamily('Montserrat-SemiBold'),
      };
    case 'Montserrat-Medium':
      return {
        ...styleObject,
        fontWeight: getFontWeight(styleObject?.fontWeight || 'normal'),
        fontFamily: getFontFamily('Montserrat-Medium'),
      };
    case 'Montserrat-Light':
      return {
        ...styleObject,
        fontWeight: getFontWeight(styleObject?.fontWeight || 'normal'),
        fontFamily: getFontFamily('Montserrat-Light'),
      };
    default: {
      if (Platform.OS === 'android' && styleObject?.fontFamily) {
        return styleObject;
      }
      switch (styleObject?.fontWeight) {
        case '100':
          return {
            ...styleObject,
            fontWeight: getFontWeight(styleObject?.fontWeight || 'normal'),
            fontFamily: getFontFamily('Montserrat-Light'),
          };
        case '200':
          return {
            ...styleObject,
            fontWeight: getFontWeight(styleObject?.fontWeight || 'normal'),
            fontFamily: getFontFamily('Montserrat-Light'),
          };
        case '300':
          return {
            ...styleObject,
            fontWeight: getFontWeight(styleObject?.fontWeight || 'normal'),
            fontFamily: getFontFamily('Montserrat-Regular'),
          };
        case '400':
          return {
            ...styleObject,
            fontWeight: getFontWeight(styleObject?.fontWeight || 'normal'),
            fontFamily: getFontFamily('Montserrat-Regular'),
          };
        case '500':
          return {
            ...styleObject,
            fontWeight: getFontWeight(styleObject?.fontWeight || 'normal'),
            fontFamily: getFontFamily('Montserrat-Medium'),
          };
        case '600':
          return {
            ...styleObject,
            fontWeight: getFontWeight(styleObject?.fontWeight || 'normal'),
            fontFamily: getFontFamily('Montserrat-SemiBold'),
          };
        case '700':
          return {
            ...styleObject,
            fontWeight: getFontWeight(styleObject?.fontWeight || 'normal'),
            fontFamily: getFontFamily('Montserrat-Bold'),
          };
        case '800':
          return {
            ...styleObject,
            fontWeight: getFontWeight(styleObject?.fontWeight || 'normal'),
            fontFamily: getFontFamily('Montserrat-Bold'),
          };
        case 'bold':
          return {
            ...styleObject,
            fontWeight: getFontWeight(styleObject?.fontWeight || 'normal'),
            fontFamily: getFontFamily('Montserrat-Bold'),
          };
        case 'normal':
          return {
            ...styleObject,
            fontWeight: getFontWeight(styleObject?.fontWeight || 'normal'),
            fontFamily: getFontFamily('Montserrat-Regular'),
          };
        default:
          return {
            ...styleObject,
            fontWeight: getFontWeight(styleObject?.fontWeight || 'normal'),
            fontFamily: getFontFamily('Montserrat-Regular'),
          };
      }
    }
  }
};
