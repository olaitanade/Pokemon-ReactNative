/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {Image, ImageSourcePropType, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import screen from 'core/util/screen';
import {Pokeball} from 'components/pokemon/Pokeball';
import {getImageColors} from 'core/util/color';
import FastImage from 'react-native-fast-image';
import cx from 'classnames';

const DEFAULT_COLOR = '#fff';

type ImageBackgroundProps = {
  imageUri: string | ImageSourcePropType;
  width?: number;
  height?: number;
  type?: 'remote' | 'local';
};

const ImageBackground = ({
  imageUri,
  width = 100,
  height = 100,
  type = 'remote',
}: ImageBackgroundProps) => {
  const [background, setBackground] = useState(DEFAULT_COLOR);

  const getPictureColors = useCallback(async () => {
    const [primary = DEFAULT_COLOR, secondary = DEFAULT_COLOR] =
      await getImageColors(imageUri as string);
    setBackground(secondary);
  }, [imageUri]);

  useEffect(() => {
    getPictureColors();
  }, [getPictureColors]);

  return (
    <View
      style={{backgroundColor: background, opacity: 0.85}}
      className={cx('flex-1 items-center justify-center relative')}>
      {type === 'local' && (
        <Image
          source={imageUri as ImageSourcePropType}
          style={{width, height}}
        />
      )}
      {type === 'remote' && (
        <FastImage
          style={{width, height}}
          source={{
            uri: imageUri as string,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
      )}

      <View
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
    </View>
  );
};

export default ImageBackground;
