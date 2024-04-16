/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import Animated, {
  Extrapolate,
  useAnimatedStyle,
  interpolate,
  SharedValue,
} from 'react-native-reanimated';

const _indicatorSize = 4;
const _spacing = 14;

const PaginationDot = ({
  scrollY,
  index,
}: {
  scrollY: SharedValue<number>;
  index: number;
}) => {
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

const Pagination = ({
  scrollY,
  data,
}: {
  scrollY: SharedValue<number>;
  data: WalkThroughData[];
}) => {
  return (
    <View style={{position: 'absolute', left: _spacing}}>
      {data.map((i, index) => {
        return <PaginationDot key={i.key} index={index} scrollY={scrollY} />;
      })}
    </View>
  );
};

export default Pagination;
