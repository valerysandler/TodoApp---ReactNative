import { Slot } from 'expo-router';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store/index'; // путь зависит от структуры

export default function RootLayout() {
  return (
    <ReduxProvider store={store}>
      <SafeAreaProvider>
        <PaperProvider>
          <Slot />
        </PaperProvider>
      </SafeAreaProvider>
    </ReduxProvider>
  );
}
