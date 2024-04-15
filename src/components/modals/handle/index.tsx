import React, {FC} from 'react';

import {View} from 'react-native';

const ModalHandle: FC = () => (
  <View className="pt-12 pb-4 items-center justify-center">
    <View className="w-56 h-6 bg-purple-200 bg-opacity-25 rounded-full" />
  </View>
);

export const modalHandleHeight = 22;

export default ModalHandle;
