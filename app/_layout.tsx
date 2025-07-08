import { Slot } from 'expo-router';
import { Provider as PaperProvider, MD3LightTheme } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '../src/store/index'; // путь зависит от структуры
import { GestureHandlerRootView } from 'react-native-gesture-handler';


const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#2563eb',
    background: '#f9fafb',
    surface: '#ffffff',
    text: '#111827',
    outline: '#e5e7eb',
    error: '#ef4444',
  },
};

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ReduxProvider store={store}>
        <SafeAreaProvider>
          <PaperProvider theme={theme}>
            <Slot />
          </PaperProvider>
        </SafeAreaProvider>
      </ReduxProvider>
    </GestureHandlerRootView>

  );
}
