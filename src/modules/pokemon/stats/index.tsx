import React, {useContext} from 'react';
import {View} from 'react-native';

import {Stat} from '../../../components/pokemon/stat';
import {Store} from 'core/state/store';

export const Stats = () => {
  const {state} = useContext(Store);
  const stats = state.pokemon.stats;
  const total = stats.reduce((prev, curr) => prev + curr.base_stat, 0) || 0;

  return (
    <View className="py-20">
      {stats.map(({stat, base_stat}) => (
        <Stat
          key={stat.name}
          name={stat.name}
          baseStat={base_stat}
          percetange={150}
        />
      ))}
      <Stat name="Total" baseStat={total} percetange={1000} />
    </View>
  );
};
