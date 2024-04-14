import {Dimensions, PixelRatio, StatusBar} from 'react-native';

import {getByPlatform} from '../utils';
import {initialWindowMetrics} from 'react-native-safe-area-context';

const SAFE_X = 20;

const {width, height, fontScale, scale} = Dimensions.get('window');

const insets = initialWindowMetrics?.insets ?? {
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
};

const safeWidth = width - SAFE_X * 2;

const statusBarHeight = StatusBar.currentHeight;

function getWidth(multiple = 1) {
  return width * multiple;
}

function getHeight(multiple = 1) {
  return height * multiple;
}

function getFontSize(size: number) {
  return size / PixelRatio.getFontScale();
}

function getSizeScale(size: number) {
  return size * scale;
}

const screen = {
  SAFE_X,
  statusBarHeight,
  width,
  safeWidth,
  height,
  insets: getByPlatform({
    ios: insets,
    android: {
      ...insets,
      bottom: 0,
    },
  }),
  fontScale,
  scale,
  getWidth,
  getHeight,
  getFontSize,
  getSizeScale,
};

export default screen;
