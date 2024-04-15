/* eslint-disable react-native/no-inline-styles */
import {Store} from 'core/state/store';
import React, {useContext} from 'react';
import {FlatList, Text, View} from 'react-native';

export const Moves = () => {
  const {state} = useContext(Store);
  const moves = state.pokemon.moves;

  return (
    <View className="p-15">
      <FlatList
        data={moves}
        keyExtractor={({move}) => move.name}
        renderItem={({item}) => (
          <Text className=" w-[30%] py-2 capitalize">{item.move.name}</Text>
        )}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      />
    </View>
  );
};
