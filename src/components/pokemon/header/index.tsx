/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import DotsIcon from 'assets/svg/dots.svg';
import LeftArrowWhite from 'assets/svg/left-arrow-white.svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

type Props = {
  backgroundColor: string;
  picture: string;
  name: string;
  id: string;
  types: Type[] | undefined;
};

export const Header = ({backgroundColor, picture, name, id, types}: Props) => {
  const {goBack} = useNavigation();

  const addZeros = useCallback((id: string) => {
    return id.padStart(3, '0');
  }, []);

  const offset = useSharedValue(0);

  // Animated styles
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateY: offset.value}],
    };
  });

  React.useEffect(() => {
    offset.value = withRepeat(
      withTiming(10, {duration: 1000, easing: Easing.inOut(Easing.ease)}),
      -1,
      true,
    );
  }, []);

  return (
    <View style={{...styles.container, backgroundColor}}>
      <DotsIcon style={styles.dotsIcon} />
      <View style={styles.square} />

      <View style={styles.cta}>
        <TouchableOpacity style={{width: 30, height: 30}} onPress={goBack}>
          <LeftArrowWhite width={30} height={30} />
        </TouchableOpacity>
      </View>
      <Animated.View style={[styles.wrapPicture, animatedStyles]}>
        <Image source={{uri: picture}} style={styles.picture} />
      </Animated.View>

      <View style={styles.wrapText}>
        <Text style={styles.title}>{name}</Text>
        <Text style={[styles.badge, styles.id]}>#{addZeros(id)}</Text>
      </View>

      <View style={styles.wrapTypes}>
        {types?.map(type => (
          <Text key={type.slot} style={styles.badge}>
            {type.type.name}
          </Text>
        ))}
      </View>

      <View style={styles.tabBg} />
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'tomato',
    margin: 30,
  },
  container: {
    width: '100%',
    height: 425,
    position: 'relative',
    zIndex: 10,
  },
  dotsIcon: {
    position: 'absolute',
    top: -35,
    right: 100,
    opacity: 0.5,
    width: 150,
  },
  square: {
    position: 'absolute',
    top: -30,
    left: -50,
    width: 150,
    height: 150,
    borderRadius: 50,
    transform: [{rotate: '60deg'}],
    backgroundColor: 'rgba(255,255,255,.15)',
  },
  cta: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50,
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  wrapPicture: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: -20,
    width: '100%',
    zIndex: 1,
  },
  picture: {
    width: 280,
    height: 280,
  },
  wrapText: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  title: {
    color: '#ffffff',
    fontSize: 40,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  wrapTypes: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 10,
  },
  badge: {
    color: '#ffffff',
    textTransform: 'capitalize',
    backgroundColor: 'rgba(255,255,255,.15)',
    paddingHorizontal: 10,
    marginLeft: 10,
    borderRadius: 10,
  },
  id: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  tabBg: {
    position: 'absolute',
    width: '100%',
    height: 30,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: '#fff',
    bottom: -5,
  },
});
