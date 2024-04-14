import screen from 'core/util/screen';
import {Platform, StyleSheet} from 'react-native';
import colors from 'theme/data/colors.json';

const textStyles: any = StyleSheet.create({
  common: {
    color: colors.gray['100'],
  },

  tab: {
    color: colors.black,
    fontFamily: Platform.select({android: 'latoblack'}),
    fontWeight: Platform.select({ios: '600'}),
    padding: 0,
    margin: 0,
    fontSize: screen.getFontSize(11),
    width: 80,
  },

  textlight: {
    fontFamily: Platform.select({android: 'latolight'}),
  },

  textregular: {
    fontFamily: Platform.select({android: 'latoregular'}),
  },

  textmedium: {
    fontFamily: Platform.select({android: 'latoblack'}),
    fontWeight: Platform.select({ios: '500'}),
  },

  textbold: {
    fontFamily: Platform.select({android: 'latobold'}),
    fontWeight: Platform.select({ios: '700'}),
  },

  displayregular: {
    fontFamily: Platform.select({android: 'latoregular'}),
  },

  displaymedium: {
    fontFamily: Platform.select({android: 'latoblack'}),
    fontWeight: Platform.select({ios: '500'}),
  },

  displaybold: {
    fontFamily: Platform.select({android: 'latobold'}),
    fontWeight: Platform.select({ios: '700'}),
  },

  caption: {
    fontSize: screen.getFontSize(11),
    lineHeight: screen.getFontSize(13),
  },

  footnote: {
    fontSize: screen.getFontSize(12),
    lineHeight: screen.getFontSize(16),
  },

  subhead: {
    fontSize: screen.getFontSize(14),
    lineHeight: screen.getFontSize(25),
  },

  body: {
    fontSize: screen.getFontSize(16),
    lineHeight: screen.getFontSize(22),
    letterSpacing: Platform.select({android: screen.getFontSize(0.3)}),
  },

  headline: {
    fontSize: screen.getFontSize(18),
    lineHeight: screen.getFontSize(23),
    letterSpacing: Platform.select({android: screen.getFontSize(0.35)}),
  },

  headingthree: {
    fontSize: screen.getFontSize(20),
    lineHeight: screen.getFontSize(25),
  },

  headingtwo: {
    fontSize: screen.getFontSize(22),
    lineHeight: screen.getFontSize(28),
  },

  headingone: {
    fontSize: screen.getFontSize(24),
    lineHeight: screen.getFontSize(30),
  },

  title: {
    fontSize: screen.getFontSize(28),
    lineHeight: screen.getFontSize(34),
  },

  largetitle: {
    fontSize: screen.getFontSize(30),
    lineHeight: screen.getFontSize(37),
    letterSpacing: Platform.select({android: screen.getFontSize(0.35)}),
  },

  hugetitle: {
    fontSize: screen.getFontSize(64),
    lineHeight: screen.getFontSize(72),
    letterSpacing: Platform.select({android: screen.getFontSize(0.35)}),
  },

  input: {
    fontSize: screen.getFontSize(20),
    fontStyle: 'normal',
    fontWeight: 'normal',
    padding: 10,
    paddingVertical: Platform.OS === 'android' ? 0 : 3,
    includeFontPadding: false,
    letterSpacing: Platform.select({android: screen.getFontSize(0.35)}),
    color: 'black',
  },

  headingoneinput: {
    fontSize: screen.getFontSize(24),
    fontStyle: 'normal',
    fontWeight: 'normal',
    padding: 0,
    paddingVertical: Platform.OS === 'android' ? 0 : 3,
    includeFontPadding: false,
    letterSpacing: Platform.select({android: screen.getFontSize(0.35)}),
  },

  touchableinput: {
    paddingVertical: Platform.select({android: 2.8, ios: 2.2}),
  },
});

export default textStyles;
