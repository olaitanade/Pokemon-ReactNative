import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import RightArrowBlackIcon from 'assets/svg/right-arrow-black.svg';
import assets from 'assets/index';

type Props = {
  evolutions: EvolutionProps[];
  positions: number[];
};

export const EvolutionGroup = ({evolutions, positions}: Props) => {
  return (
    <View style={styles.container}>
      <Evolution
        picture={evolutions[positions[0]].picture}
        name={evolutions[positions[0]].name}
      />

      <View style={styles.level}>
        <RightArrowBlackIcon width={30} height={30} />
        <Text style={styles.levelText}>
          Level {evolutions[positions[1]].level}
        </Text>
      </View>

      <Evolution
        picture={evolutions[positions[1]].picture}
        name={evolutions[positions[1]].name}
      />
    </View>
  );
};

const Evolution = ({picture, name}: EvolutionProps) => {
  return (
    <View>
      <View style={styles.wrapperPicture}>
        <Image style={styles.pokeball} source={assets.images.pokeball} />
        {picture && <Image source={{uri: picture}} style={styles.picture} />}
      </View>
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 15,
  },
  evolution: {},
  wrapperPicture: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: 110,
    height: 110,
  },
  pokeball: {
    position: 'absolute',
    width: 105,
    height: 105,
    opacity: 0.1,
  },
  name: {
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  level: {
    alignItems: 'center',
  },
  levelText: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  picture: {
    width: 90,
    height: 90,
  },
});
