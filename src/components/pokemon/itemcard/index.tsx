/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useCallback, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity, StyleSheet, Image} from 'react-native';
import {Card} from './card';
import {getImageColors} from 'core/util/color';
import routes from 'router/routes';
import router from 'router/index';

type Props = {
  item: PokemonCustom;
};
const DEFAULT_COLOR = '#f5f5f5';

const ItemCard = ({item}: Props) => {
  const [background, setBackground] = useState(DEFAULT_COLOR);
  const {picture, name, id} = item;

  const getPictureColors = useCallback(async () => {
    const [primary = DEFAULT_COLOR, secondary = DEFAULT_COLOR] =
      await getImageColors(picture);
    setBackground(secondary);
  }, [picture]);

  useEffect(() => {
    getPictureColors();
  }, [getPictureColors]);

  if (background === DEFAULT_COLOR) {
    return <Card id={id} name={name} pokeballColor="gray" />;
  }

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() =>
        router.navigate(routes.pokemondetail, {
          pokemonItem: item,
          color: background,
        })
      }>
      <Card id={id} name={name} color="#fff" backgroundColor={background}>
        <Image source={{uri: picture}} style={styles.img} />
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  img: {
    width: 120,
    height: 120,
    position: 'absolute',
    bottom: -15,
    right: -10,
    zIndex: 1,
  },
});

export const PokemonItemCard = React.memo(ItemCard);
