/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
// Inspiration https://dribbble.com/shots/6293853-UI-Challenge-011-Workout-of-the-Day
import * as React from 'react';
import {
  Pressable,
  StatusBar,
  Dimensions,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import Animated, {
  Extrapolate,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  useAnimatedScrollHandler,
  SharedValue,
} from 'react-native-reanimated';
import RightArrow from 'assets/svg/right-arrow.svg';
const {width, height} = Dimensions.get('window');

import {faker} from '@faker-js/faker';
import {getRandomInt} from 'core/util/utils';
import ImageBackground from './components/imagebackground';
import assets from 'assets/index';
import {useStore} from 'core/state/store';
import Pagination from './components/pagination';
import config from 'core/config';
faker.seed(10);

const AnimatedFlatList = Animated.FlatList;

const _indicatorSize = 4;
const _spacing = 14;
const _buttonSize = 64;

const _data: WalkThroughData[] = [
  {
    key: faker.string.uuid(),
    title: 'Welcome to Pokemon World',
    description: 'Experience the new world of Pokemon',
    image: assets.images.pokemon1,
    type: 'local',
  },
  {
    key: faker.string.uuid(),
    title: 'Search',
    description: 'Experience the vast collection of Pokemon',
    image: `${config.api.artwork}${getRandomInt(1, 500)}.png`,
  },
  {
    key: faker.string.uuid(),
    title: 'View Details',
    description: 'Indepth details of each Pokemon',
    image: `${config.api.artwork}${getRandomInt(1, 500)}.png`,
  },
  {
    key: faker.string.uuid(),
    title: "Let's Go!",
    description: 'Pokemon Go!',
    image: `${config.api.artwork}${getRandomInt(1, 500)}.png`,
  },
];

const Details = ({
  scrollY,
  item,
  index,
}: {
  scrollY: SharedValue<number>;
  item: WalkThroughData;
  index: number;
}) => {
  const stylez = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [index - 1, index, index + 1],
        [0, 1, 0],
        Extrapolate.CLAMP,
      ),
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            [index - 1, index, index + 1],
            [20, 0, -20],
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  });
  return (
    <View
      style={[
        {
          position: 'absolute',
          width: '100%',
          zIndex: _data.length - index,
          overflow: 'hidden',
        },
      ]}>
      <Animated.View style={stylez}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </Animated.View>
    </View>
  );
};
const DetailsWrapper = ({
  scrollY,
  data,
}: {
  scrollY: SharedValue<number>;
  data: WalkThroughData[];
}) => {
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        top: '75%',
        alignItems: 'center',
        left: _spacing * 2 + _indicatorSize,
        right: _spacing,
      }}
      pointerEvents="none">
      {data.map((item, index) => {
        return (
          <Details key={item.key} item={item} index={index} scrollY={scrollY} />
        );
      })}
    </View>
  );
};

const Item = ({item, index}: {item: WalkThroughData; index: number}) => {
  return (
    <ImageBackground
      imageUri={item.image}
      width={width}
      height={height}
      type={item.type}
    />
  );
};

export default function Walkthrough() {
  const {dispatch} = useStore();
  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: ev => {
      scrollY.value = ev.contentOffset.y / height;
    },
    onMomentumEnd: ev => {
      scrollY.value = Math.floor(ev.contentOffset.y / height);
    },
  });
  return (
    <View style={styles.container}>
      <AnimatedFlatList
        data={_data}
        renderItem={({item, index}) => (
          <Item item={item as WalkThroughData} index={index} />
        )}
        onScroll={onScroll}
        scrollEventThrottle={16}
        pagingEnabled
        decelerationRate="fast"
        bounces={false}
      />
      <Pagination scrollY={scrollY} data={_data} />
      <DetailsWrapper scrollY={scrollY} data={_data} />
      <Pressable
        onPress={() => {
          dispatch({type: 'SET_INITIALROUTE', payload: 'App'});
        }}
        style={{
          position: 'absolute',
          bottom: _spacing * 4,
          right: _spacing * 2,
        }}>
        <View
          style={{
            width: _buttonSize,
            height: _buttonSize,
            borderRadius: _buttonSize / 2,
            backgroundColor: '#FA6301',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <RightArrow width={32} height={32} />
        </View>
      </Pressable>
      <StatusBar hidden />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  title: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 32,
    marginBottom: _spacing / 2,
  },
  description: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: _spacing / 2,
  },
  duration: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
});
