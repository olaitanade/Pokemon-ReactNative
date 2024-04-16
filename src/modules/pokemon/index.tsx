import React from 'react';
import {View, StyleSheet} from 'react-native';
import {usePokemon} from 'core/data/hooks/usepokemon';
import {NoDetailsFound} from 'components/pokemon/NoDetailsFound';
import {Header} from 'components/pokemon/header';
import Activity from 'components/activity';
import {Detail} from 'modules/pokemon/detail';
import router from 'router/index';

export const PokemonDetail = () => {
  const {pokemonItem, color} = router.getRouteAttributes()?.params;
  const {pokemon, status} = usePokemon(pokemonItem.id);

  return (
    <>
      <Header
        backgroundColor={color}
        picture={pokemonItem.picture}
        name={pokemonItem.name}
        types={pokemon?.types}
        id={pokemonItem.id}
      />
      <View style={styles.tabsContainer}>
        {status === 'loading' && <Activity />}
        {status === 'error' && (
          <NoDetailsFound message="No details found for this pokemon." />
        )}
        {status === 'success' && <Detail />}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  tabsContainer: {
    width: '100%',
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
});
