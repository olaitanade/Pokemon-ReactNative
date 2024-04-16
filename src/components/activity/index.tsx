import React, {FC, memo} from 'react';
import {StyleProp, ViewStyle} from 'react-native';

import LottieView from 'lottie-react-native';
import assets from 'assets';
import screen from 'core/util/screen';

type ActivityProps = {
  style?: StyleProp<ViewStyle>;
};

//Pikachu running animation
const LottieActivity: FC<ActivityProps> = ({style}) => {
  return (
    <LottieView
      source={assets.lotties.pikachu_run}
      // eslint-disable-next-line react-native/no-inline-styles
      style={[
        {width: screen.getSizeScale(50), height: screen.getSizeScale(50)},
        style,
      ]}
      autoPlay
      loop
    />
  );
};

const Activity = memo(LottieActivity);

export default Activity;
