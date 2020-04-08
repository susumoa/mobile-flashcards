import React from 'react'
import { StyleSheet, View, StatusBar, AsyncStorage, Dimensions } from 'react-native'
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
      tabBarOptions={{
        style: { backgroundColor: '#5e7f91' },
        activeTintColor: '#fff',
        labelStyle: { fontSize: 18 },
      }}
      sceneContainerStyle={{
        backgroundColor: '#f3f9fd'
      }}
    >
      <Tab.Screen
        name='Deck List'
        component={DeckList}
        options={{
          tabBarLabel: 'Deck List',
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
    // if need to start over:
    // AsyncStorage.clear()
    setLocalNotification()
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor='#5e7f91' barStyle='light-content' />
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName='Home'
            headerMode='screen'
            screenOptions={{
              headerTintColor: '#fff',
              headerTitleAlign: 'center',
              headerStyle: { backgroundColor: '#5e7f91' },
              cardStyle: {
                backgroundColor: '#f3f9fd'
              }
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
              options={{
                title: '',
              }}
            />
            <Stack.Screen
              name='New Card'
              component={NewCard}
              options={{
                title: 'Add Card'
              }}
            />
            <Stack.Screen
              name='Quiz'
              component={Quiz}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default App