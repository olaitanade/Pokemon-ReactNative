import {FlashList} from '@shopify/flash-list';
import Activity from 'components/activity';
import {usePokemons} from 'core/data/hooks/usepokemons';
import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Pikachu from 'assets/svg/pikachu.svg';
import LeftArrow from 'assets/svg/left-arrow.svg';
import {PokemonItemCard} from 'components/pokemon/itemcard';
import {Pokeball} from 'components/pokemon/Pokeball';
import Search from 'assets/svg/search.svg';
import TouchableInput from 'components/input/touchable-input';
import {useNavigation} from '@react-navigation/native';
import routes from 'router/routes';

export const Pokemons = () => {
  const {navigate} = useNavigation();
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = usePokemons();

  if (status === 'pending') {
    return (
      <View
        className={'bg-[#316AB2] flex-1 items-center justify-center relative'}>
        <Activity />
      </View>
    );
  }

  if (status === 'error') {
    return (
      <View style={styles.withoutResults}>
        <Text style={styles.withoutResultText}>
          At this time there are no pokemons available.
        </Text>
        <Pikachu width={200} height={200} style={styles.withoutResultImg} />
      </View>
    );
  }

  return (
    <SafeAreaView className=" flex-1 bg-gray-200">
      <View className=" flex-1">
        <View className="flex-row justify-between items-center h-60 bg-[#316AB2]">
          <Text style={styles.title}>Pokemons</Text>
          <Pokeball size={150} position={-50} />
        </View>
        <View className="flex-row">
          <TouchableInput
            onPress={() => {
              navigate(routes.searchpokemon);
            }}
            placeholder="Search"
            leftAccessory={<Search width={20} height={20} />}
          />
        </View>

        <FlashList
          data={
            data?.pages
              .map(page =>
                page.data.results.map(({name, url}) => {
                  const urlSplit = url.split('/');
                  const id = urlSplit[urlSplit.length - 2];
                  const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

                  return {id, picture, name};
                }),
              )
              .flat() || []
          }
          estimatedItemSize={600}
          keyExtractor={pokemon => pokemon.id}
          renderItem={({item}) => <PokemonItemCard item={item} />}
          showsVerticalScrollIndicator={false}
          onEndReached={() => {
            if (hasNextPage && !isFetching && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={<Activity />}
          removeClippedSubviews
          numColumns={2}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginLeft: 20,
    color: '#fff',
  },
  withoutResults: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  withoutResultText: {
    fontSize: 25,
    width: '80%',
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  withoutResultImg: {
    width: 150,
    height: 150,
    opacity: 0.9,
  },
});