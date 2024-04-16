/* eslint-disable react-native/no-inline-styles */
import {FlashList} from '@shopify/flash-list';
import Activity from 'components/activity';
import {usePokemons} from 'core/data/hooks/usepokemons';
import React from 'react';
import {Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Pikachu from 'assets/svg/pikachu.svg';
import {PokemonItemCard} from 'components/pokemon/itemcard';
import {Pokeball} from 'components/pokemon/Pokeball';
import Search from 'assets/svg/search.svg';
import TouchableInput from 'components/input/touchable-input';
import routes from 'router/routes';
import Title from 'components/text/title';
import {mapToCustom} from 'core/util/utils';
import router from 'router/index';

export const Pokemons = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = usePokemons();

  if (status === 'pending') {
    return (
      <View className={'flex-1 items-center justify-center relative'}>
        <Activity />
      </View>
    );
  }

  if (status === 'error') {
    return (
      <View className="flex-1 justify-center items-center bg-red-100">
        <Text className=" text-center mb-20 text-white font-bold w-[80%]">
          At this time there are no pokemons available.
        </Text>
        <Pikachu width={200} height={200} />
      </View>
    );
  }

  return (
    <SafeAreaView className=" flex-1 bg-gray-200">
      <View className=" flex-1">
        <View className="flex-row justify-between items-center h-60 bg-[#316AB2]">
          <Title className="text-white ml-20 font-bold">Pokemons</Title>
          <Pokeball size={150} position={-50} />
        </View>
        <View className="flex-row">
          <TouchableInput
            onPress={() => {
              router.navigate(routes.searchpokemon);
            }}
            placeholder="Search"
            leftAccessory={<Search width={20} height={20} />}
          />
        </View>

        <FlashList
          data={
            data?.pages
              .map(page => page.data.results.map(mapToCustom))
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
