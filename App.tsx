import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import Home from './components/Home';
import Calcule from './components/Calcule';
import UiExample from './components/Ui1';
import FlatListBasics from './components/ListComponent';
import MediaComponent from './components/MediaComponent';
import Weather from './components/Weather';
import Movies from './components/Movies';

const Stack = createNativeStackNavigator();

export default class App extends React.Component {
  render(): React.ReactNode {
    return (
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#5f5cff',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen 
            name="home" 
            component={Home} 
            options={{ title: 'Tableau de bord' }} 
          />
          <Stack.Screen 
            name="calculs" 
            component={Calcule} 
            options={{ title: 'Calculatrice' }} 
          />
          <Stack.Screen 
            name="ui1" 
            component={UiExample} 
            options={{ title: 'Widgets & UI' }} 
          />
          <Stack.Screen 
            name="list" 
            component={FlatListBasics} 
            options={{ title: 'Liste de fruits' }} 
          />
          <Stack.Screen 
            name="media" 
            component={MediaComponent} 
            options={{ title: 'Galerie Média' }} 
          />

            <Stack.Screen 
            name="weather" 
            component={Weather} 
            options={{ title: 'Météo' }} 
          />
          <Stack.Screen 
            name="movies" 
            component={Movies} 
            options={{ title: '🎬 Films & Séries' }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}