/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import {View} from 'react-native';
import Animated, {
  Extrapolate,
  useAnimatedStyle,
  interpolate,
} from 'react-native-reanimated';

const _indicatorSize = 4;
const _spacing = 14;

const PaginationDot = ({scrollY, index}) => {
  const stylez = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [index - 1, index, index + 1],
        [_indicatorSize, _indicatorSize * 6, _indicatorSize],
        Extrapolate.CLAMP,
      ),
    };
  });
  return (
    <Animated.View
      style={[
        {
          width: _indicatorSize,
          height: _indicatorSize,
          borderRadius: _indicatorSize / 2,
          backgroundColor: 'white',
          marginBottom: _indicatorSize / 2,
        },
        stylez,
      ]}
    />
  );
};

const Pagination = ({scrollY, data}) => {
  return (
    <View style={{position: 'absolute', left: _spacing}}>
      {data.map((_, index) => {
        return <PaginationDot index={index} scrollY={scrollY} />;
      })}
    </View>
  );
};

export default Pagination;
