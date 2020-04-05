import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import DeckList from './components/DeckList'
import Quiz from './components/Quiz'
import NewDeck from './components/NewDeck'
import NewCard from './components/NewCard'

const Tab = createMaterialTopTabNavigator()

export default class App extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName='Deck List'
            barStyle={{
              height: 56,
              backgroundColor: 'blue',
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
            /><Tab.Screen
            name='New Deck'
            component={NewDeck}
            options={{
              tabBarLabel: 'New Deck'
            }}
          />
          </Tab.Navigator>
        </NavigationContainer>
      </View>
    )
  }
}