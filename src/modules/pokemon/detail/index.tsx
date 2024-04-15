import React, {useContext} from 'react';
import {View} from 'react-native';
import {NoDetailsFound} from '../../../components/pokemon/NoDetailsFound';
import {Store} from 'core/state/store';
import {calculateHeight, calculateweight} from 'core/util/units';
import GhostButton from 'components/button/ghost';
import EvolutionIcon from 'assets/svg/evolution.svg';
import StatsIcon from 'assets/svg/stats.svg';
import MovesIcon from 'assets/svg/moves.svg';
import ModalBase from 'components/modals/base';
import {Stats} from '../stats';
import {useModalUtils} from 'core/hooks';
import {Moves} from 'modules/pokemon/move';
import Body from 'components/text/body';
import Caption from 'components/text/caption';
import Subhead from 'components/text/subhead';
import {Evolution} from '../evolution';

export const Detail = () => {
  const {state} = useContext(Store);
  const evolutionModalUtils = useModalUtils();
  const statsModalUtils = useModalUtils();
  const movesModalUtils = useModalUtils();
  const about = state.pokemon.about;

  if (!about) {
    return (
      <NoDetailsFound message="No information was found about this pokemon." />
    );
  }

  const {feet, cm} = calculateHeight(about.height);
  const {lbs, kg} = calculateweight(about.weight);
  const abilities = about.abilities.map(({ability}) => ability.name).join(', ');
  const eggGroups = about.egg_groups.map(({name}) => name).join(', ');

  return (
    <View className="py-18 bg-white">
      <View className="flex-row justify-around mb-24">
        <GhostButton onPress={evolutionModalUtils.open}>
          <EvolutionIcon width={30} height={30} />
          <Caption>Evolution</Caption>
        </GhostButton>
        <GhostButton onPress={statsModalUtils.open}>
          <StatsIcon width={30} height={30} />
          <Caption>Stats</Caption>
        </GhostButton>
        <GhostButton onPress={movesModalUtils.open}>
          <MovesIcon width={30} height={30} />
          <Caption>Moves</Caption>
        </GhostButton>
      </View>
      <Body className=" mb-18">{about.flavorText}</Body>
      <View className="flex-row mb-10">
        <Subhead className=" min-w-[90] text-black">Weight:</Subhead>
        <Body>
          {lbs} {kg}
        </Body>
      </View>
      <View className="flex-row mb-10">
        <Subhead className=" min-w-[90] text-black">Height:</Subhead>
        <Body>
          {feet} {cm}
        </Body>
      </View>
      <View className="flex-row mb-10">
        <Subhead className=" min-w-[90] text-black">Habitat:</Subhead>
        <Body className="capitalize">{about.habitat?.name}</Body>
      </View>
      <View className="flex-row mb-10">
        <Subhead className=" min-w-[90] text-black">Abilities:</Subhead>
        <Body className="capitalize">{abilities}</Body>
      </View>
      <View className="flex-row mb-10">
        <Subhead className=" min-w-[90] text-black">Egg Groups:</Subhead>
        <Body className="capitalize">{eggGroups}</Body>
      </View>
      <ModalBase
        visible={evolutionModalUtils.visible}
        onRequestClose={evolutionModalUtils.close}
        fitContent>
        <Evolution />
      </ModalBase>
      <ModalBase
        visible={statsModalUtils.visible}
        onRequestClose={statsModalUtils.close}
        fitContent>
        <Stats />
      </ModalBase>
      <ModalBase
        visible={movesModalUtils.visible}
        onRequestClose={movesModalUtils.close}
        fitContent={false}>
        <Moves />
      </ModalBase>
    </View>
  );
};
