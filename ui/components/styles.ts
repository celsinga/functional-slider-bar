import {StyleSheet} from 'react-native';
import {colors} from '../common/styles';

export const styles = StyleSheet.create({
  progressBarContainer: {
    height: 40,
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  starContainer: {
    alignItems: 'center',
    height: '100%',
    position: 'absolute',
    zIndex: 1,
  },
  progressBarSectionContainer: {
    height: 15,
    backgroundColor: colors.white,
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.blueViolet,
  },
  star: {
    height: 32,
    width: 32,
  },
  emptyProgressBar: {
    borderRightWidth: 2,
    borderRightColor: colors.blueViolet,
    height: '100%',
    width: '20%',
  },
  halfProgressBarContainer: {
    height: '100%',
    width: '20%',
    flexDirection: 'row',
  },
  filledHalfBar: {
    height: '100%',
    borderRadius: 10,
    width: '50%',
    borderWidth: 1,
    borderColor: colors.blueViolet,
    backgroundColor: colors.blueViolet,
  },
  emptyHalfBar: {
    backgroundColor: colors.white,
    height: '100%',
    width: '50%',
    borderRightWidth: 2,
    borderRightColor: colors.blueViolet,
  },
  fullProgressBar: {
    borderRadius: 10,
    borderRightWidth: 2,
    borderRightColor: colors.white,
    height: '100%',
    width: '20%',
    backgroundColor: colors.blueViolet,
  },
  discountTextContainer: {
    flexDirection: 'row',
    alignContent: 'flex-end',
    justifyContent: 'space-evenly',
  },
});

export default styles;
