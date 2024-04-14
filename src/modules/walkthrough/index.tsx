/* eslint-disable react-native/no-inline-styles */
// Inspiration https://dribbble.com/shots/6293853-UI-Challenge-011-Workout-of-the-Day
import * as React from 'react';
import {
  Pressable,
  StatusBar,
  Image,
  Dimensions,
  FlatList,
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
} from 'react-native-reanimated';
import RightArrow from 'assets/svg/right-arrow.svg';
const {width, height} = Dimensions.get('window');

import {faker} from '@faker-js/faker';
import {getRandomInt} from 'core/util/utils';
import ImageBackground from './components/imagebackground';
import assets from 'assets/index';
import { useStore } from 'core/state/store';
faker.seed(10);

const AnimatedFlatList = Animated.FlatList;

const _indicatorSize = 4;
const _spacing = 14;
const _buttonSize = 64;
//https://unsplash.com/photos/a-pile-of-pokemon-trading-cards-sitting-on-top-of-each-other-DLeImMwOVyc

const _data = [
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
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${getRandomInt(
      1,
      500,
    )}.png`,
  },
  {
    key: faker.string.uuid(),
    title: 'View Details',
    description: 'Indepth details of each Pokemon',
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${getRandomInt(
      1,
      500,
    )}.png`,
  },
  {
    key: faker.string.uuid(),
    title: "Let's Go!",
    description: 'Pokemon Go!',
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${getRandomInt(
      1,
      500,
    )}.png`,
  },
];

const Details = ({scrollY, item, index}) => {
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
const DetailsWrapper = ({scrollY, data}) => {
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
        return <Details item={item} index={index} scrollY={scrollY} />;
      })}
    </View>
  );
};

const Item = ({item, index}) => {
  return (
    <ImageBackground
      imageUri={item.image}
      width={width}
      height={height}
      type={item.type}
    />
  );
};

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
        renderItem={props => <Item {...props} />}
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
