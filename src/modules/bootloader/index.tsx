import {View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useDarkStatusBar} from 'core/hooks';

import Activity from 'components/activity';
import RNBootSplash from 'react-native-bootsplash';
import bootloader from 'core/bootloader';
import theme from 'theme';
import {useStore} from 'core/state/store';
import screen from 'core/util/screen';
import assets from 'assets';
import PokemonLogo from 'assets/svg/pokemon_logo.svg';
import {Pokeball} from 'components/pokemon/Pokeball';
import {getImageColors} from 'core/util/color';

const Bootloader = () => {
  useDarkStatusBar();

  const {dispatch} = useStore();

  useEffect(() => {
    RNBootSplash.hide({fade: true});
    bootloader.boot(dispatch);
  }, [dispatch]);

  return (
    <View
      className={'bg-[#316AB2] flex-1 items-center justify-center relative'}>
      <PokemonLogo width={screen.safeWidth} height={screen.getSizeScale(50)} />
      {/* <Pikachu width={screen.safeWidth} height={screen.getSizeScale(50)} /> */}
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          position: 'absolute',
          width: screen.getSizeScale(100),
          height: screen.getSizeScale(100),
          top: 0,
          right: 0,
          borderRadius: 10,
          overflow: 'hidden',
        }}>
        <Pokeball
          color={'white'}
          size={screen.getSizeScale(70)}
          position={-70}
        />
      </View>
      <View
        className={`items-center pb-${
          screen.insets.bottom + theme.sizing.safeY
        }}`}>
        <Activity
          style={{
            width: screen.getSizeScale(80),
            height: screen.getSizeScale(80),
          }}
        />
      </View>
    </View>
  );
};

export default Bootloader;
