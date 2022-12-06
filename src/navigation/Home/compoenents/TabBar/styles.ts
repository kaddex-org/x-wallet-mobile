import {StyleSheet} from 'react-native';
import {BOLD_MONTSERRAT, MAIN_COLOR} from '../../../../constants/styles';
import {bottomSpace} from '../../../../utils/deviceHelpers';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingBottom: bottomSpace + 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(223, 223, 237, 0.5)',
  },
  tabBarItem: {
    flex: 1,
    alignItems: 'center',
    borderTopColor: '#FFA900',
    paddingTop: 14,
  },
  activeTab: {borderTopWidth: 2, marginTop: -2},
  disabledTab: {opacity: 0.5},
  label: {
    color: '#787B8E',
    fontFamily: BOLD_MONTSERRAT,
    fontWeight: '700',
    marginTop: 8,
    fontSize: 8,
    textTransform: 'uppercase',
  },
  activeLabel: {
    color: MAIN_COLOR,
  },
});
