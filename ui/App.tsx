import React from 'react';
import {SafeAreaView, useColorScheme, View} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {ProgressBar} from './components/ProgressBar';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <View style={backgroundStyle}>
        <ProgressBar points={0} />
      </View>
    </SafeAreaView>
  );
};

export default App;
