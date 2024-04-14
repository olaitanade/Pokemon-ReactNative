import {FlashList} from '@shopify/flash-list';
import Activity from 'components/activity';
import {usePokemons} from 'core/data/hooks/usepokemons';
import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Pikachu from 'assets/svg/pikachu.svg';

export const Pokemons = () => {
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
    <SafeAreaView>
      <View>
        <FlashList
          data={data?.pages.map(page => page.data.results).flat() || []}
          estimatedItemSize={50}
          keyExtractor={pokemon => pokemon.id}
          renderItem={({item}) => <PokedexItem item={item} />}
          showsVerticalScrollIndicator={false}
          onEndReached={() => {
            if (hasNextPage && !isFetching && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.4}
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
