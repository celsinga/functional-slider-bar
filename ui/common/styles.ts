import {StyleSheet, Dimensions} from 'react-native';

export const colors = {
  white: '#ffffff',
  black: '#000000',
  blueViolet: '#4647A7',
  mineShaft: '#323030',
  grey: '#E0E0E0',
  turquoise: '#22CAAF',
  darkGrey: '#808080',
  lightGrey: '#E6E6E6',
  inactiveGrey: '#D8D8D8',
  orange: '#FCC78D',
  red: '#C65E90',
  greenBlue: '#66CDB9',
};

export const breakpoints = {
  sm: 400,
  lg: 900,
};

export const imageValues = {
  backgroundSize: '100%',
  logoSize: Dimensions.get('screen').width / 4,
};

export const fonts = {
  // // light: 'Muli-Light',
  // standard: 'Muli',
  // semiBold: 'Muli-SemiBold',
  // bold: 'Muli-Bold',
};

export const buttonStyles = StyleSheet.create({
  backButton: {
    paddingTop: 15,
    paddingLeft: 15,
  },
  blueVioletButton: {
    backgroundColor: colors.blueViolet,
    paddingVertical: 5,
    paddingHorizontal: 80,
    borderRadius: 25,
  },
  greenButton: {
    backgroundColor: '#66CDB9',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  disabledButton: {
    backgroundColor: 'rgba(102, 205, 185, 0.25)',
    borderColor: colors.greenBlue,
    borderWidth: 4,
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
});

export const imageStyles = StyleSheet.create({
  backImg: {
    width: 32,
    height: 32,
  },
});

export const containerStyles = StyleSheet.create({
  headerContainer: {
    overflow: 'hidden',
    height: Dimensions.get('screen').height / 6,
    zIndex: -1,
  },
  headerContentContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    zIndex: -1,
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
  },
  headerText: {
    color: colors.white,
    // fontFamily: fonts.bold,
    fontSize: 30,
    textAlign: 'left',
    paddingTop: 50,
    paddingLeft: 20,
  },
  safeArea: {
    backgroundColor: colors.white,
  },
  icons: {
    flexDirection: 'row',
    position: 'absolute',
    right: -5,
    top: 15,
  },
  imgBackground: {
    flex: 1,
    height: '100%',
    width: '110%',
    marginLeft: -20,
    zIndex: -2,
  },
});

export const standardText = {
  fontSize: 16,
  color: colors.mineShaft,
  // fontFamily: fonts.standard,
};

export const textStyles = StyleSheet.create({
  headlineWhiteCenter: {
    color: colors.white,
    // fontFamily: 'Muli-Bold',
    fontSize: 34,
    textAlign: 'center',
  },
  paragraphWhiteCenter: {
    color: colors.white,
    // fontFamily: 'Muli-Bold',
    fontSize: 16,
    textAlign: 'center',
  },
  tagText: {
    fontSize: 14,
    // fontFamily: fonts.standard,
  },
  purpleText: {
    paddingRight: 10,
  },
  inactiveGreyText: {
    ...standardText,
    color: colors.inactiveGrey,
  },
  darkGreyText: {
    ...standardText,
    color: 'grey',
  },
  blackText: {
    ...standardText,
    color: colors.black,
  },
  boldPurpleText: {
    // fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.blueViolet,
  },
});
