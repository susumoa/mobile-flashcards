import React from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { setLocalNotification } from './utils/api'
import DeckList from './components/DeckList'
import Quiz from './components/Quiz'
import NewDeck from './components/NewDeck'
import NewCard from './components/NewCard'
import Deck from './components/Deck'
import CardList from './components/CardList'

const Tab = createMaterialTopTabNavigator()

function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName='Deck List'
      style={{
        height: 56,
        backgroundColor: 'red',
        shadowColor: 'rgba(0, 0, 0, 0.24)',
          shadowOffset: {
            width: 0,
            height: 3
          },
          shadowRadius: 6,
          shadowOpacity: 1,
      }}
    >
      <Tab.Screen
        name='Deck List'
        component={DeckList}
        options={{
          tabBarLabel: 'Deck List'
        }}
      />
      <Tab.Screen
      name='New Deck'
      component={NewDeck}
      options={{
        tabBarLabel: 'New Deck'
      }}
      />
    </Tab.Navigator>
  )
}

const Stack = createStackNavigator()

class App extends React.Component {
  componentDidMount() {
    // AsyncStorage.clear()
    setLocalNotification()
  }
  render() {
    return (
      <View style={{flex: 1}}>
      <StatusBar />
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName='Home'
            headerMode='screen'
            screenOptions={{
              headerTintColor: 'white',
              headerStyle: { backgroundColor: 'tomato' },
              headerTitleAlign: 'center',
            }}
          >
            <Stack.Screen
              name='Home'
              component={Tabs}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name='Deck'
              component={Deck}
              options={({ route }) => ({ title: `${route.params.deckId}`})}
            />
            <Stack.Screen
              name='New Card'
              component={NewCard}
              options={({ route }) => ({ title: `${route.params.deck.title}`})}
            />
            <Stack.Screen
              name='Quiz'
              component={Quiz}
              options={({ route }) => ({ title: `${route.params.deck.title} Quiz`})}
            />
            <Stack.Screen
              name='Card List'
              component={CardList}
              options={({ route }) => ({ title: `${route.params.deck.title} Card List`})}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    )
  }
}

export default App