import React from 'react';
import {ScrollView} from 'react-native';
import {useEvolution} from 'core/data/hooks/useEvolution';
import {NoDetailsFound} from 'components/pokemon/NoDetailsFound';
import {EvolutionGroup} from 'components/pokemon/evolutiongroup';

export const Evolution = () => {
  const {evolutions} = useEvolution();

  const hasNoEvolutions = evolutions.length <= 1;
  const hasTwoEvolution = evolutions.length > 2;

  if (hasNoEvolutions) {
    return <NoDetailsFound message="No evolutions found." />;
  }

  return (
    <ScrollView style={{padding: 10}}>
      <EvolutionGroup evolutions={evolutions} positions={[0, 1]} />
      {hasTwoEvolution && (
        <EvolutionGroup evolutions={evolutions} positions={[1, 2]} />
      )}
    </ScrollView>
  );
};
