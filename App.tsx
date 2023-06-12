import React, {useEffect, useState} from 'react';
import {
  Pressable,
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaFrame,
} from 'react-native-safe-area-context';
import {images} from './Image';
import {msgs} from './fortuneMsgs.json';
import FortuneScreen from './src/screen/ForturnScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <FortuneScreen />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({});
