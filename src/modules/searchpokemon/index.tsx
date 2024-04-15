import {FlashList} from '@shopify/flash-list';
import Activity from 'components/activity';
import {usePokemons} from 'core/data/hooks/usepokemons';
import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Pikachu from 'assets/svg/pikachu.svg';
import LeftArrow from 'assets/svg/left-arrow.svg';
import {PokemonItemCard} from 'components/pokemon/itemcard';
import {Pokeball} from 'components/pokemon/Pokeball';
import GhostButton from 'components/button/ghost';
import SearchInput from 'components/input/search-input';
import {useNavigation} from '@react-navigation/native';
import {mapToCustom} from 'core/util/utils';

export const SearchPokemon = () => {
  const {goBack} = useNavigation();
  const [query, setQuery] = useState('');
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = usePokemons();

  const handleSearch = (text: string) => {
    setQuery(text);
  };

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
        <View className="flex-row items-center mb-12">
          <GhostButton onPress={goBack} className="p-10 ml-4">
            <LeftArrow width={30} height={30} />
          </GhostButton>

          <SearchInput onDebounceText={handleSearch} className="flex-1" />
          <Pokeball size={150} position={-50} />
        </View>

        <FlashList
          data={
            data?.pages
              .map(page => page.data.results.map(mapToCustom))
              .flat()
              .filter((item: PokemonCustom) => {
                if (query) {
                  return item.name.toLowerCase().includes(query.toLowerCase());
                }
                return item;
              }) || []
          }
          estimatedItemSize={600}
          keyExtractor={pokemon => pokemon.id}
          renderItem={({item}) => <PokemonItemCard item={item} />}
          showsVerticalScrollIndicator={false}
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.4}
          ListFooterComponent={isFetching ? <Activity /> : null}
          removeClippedSubviews
          numColumns={2}
        />
      </View>
    </SafeAreaView>
  );
};
