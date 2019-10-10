import React from 'react'
import { Platform, Text } from 'react-native'
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
  createDrawerNavigator
} from 'react-navigation'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { Ionicons } from '@expo/vector-icons'

import colors from '../constants/colors'
import CategoriesScreen from '../screens/CategoriesScreen'
import CategoryMealsScreen from '../screens/CategoryMealsScreen'
import MealDetailsScreen from '../screens/MealDetailsScreen'
import FavouritesScreen from '../screens/FavouritesScreen'
import FiltersScreen from '../screens/FiltersScreen'

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? colors.primary : 'white'
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : colors.primary
}

const MealsNavigator = createStackNavigator(
  {
    Categories: CategoriesScreen,
    CategoryMeals: CategoryMealsScreen,
    MealDetails: MealDetailsScreen
  },
  {
    mode: 'modal',
    // initialRouteName: 'Categories',
    defaultNavigationOptions: defaultStackNavOptions
  }
)

const FavsNavigator = createStackNavigator(
  {
    Favourites: FavouritesScreen,
    MealDetails: MealDetailsScreen
  },
  {
    defaultNavigationOptions: defaultStackNavOptions
  }
)

const FiltersNavigator = createStackNavigator(
  {
    Filters: FiltersScreen
  },
  {
    defaultNavigationOptions: defaultStackNavOptions
  }
)

const tabScreenConfig = {
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return (
          <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />
        )
      },
      tabBarLabel:
        Platform.OS === 'android' ? (
          <Text style={{ fontFamily: 'open-sans' }}>All Meals</Text>
        ) : (
          'All Meals'
        ),
      tabBarColor: colors.primary
    }
  },
  Favourites: {
    screen: FavsNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />
      },
      tabBarColor: colors.accent,
      tabBarLabel:
        Platform.OS === 'android' ? (
          <Text style={{ fontFamily: 'open-sans' }}>Favourites</Text>
        ) : (
          'Favourites'
        )
    }
  }
}

const MealsFavsTabNavigator =
  Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeTintColor: 'white',
        shifting: true
        // if shifting false
        // barStyle: {
        //   backgroundColor: colors.primary
        // }
      })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          labelStyle: {
            fontFamily: 'open-sans'
          },
          activeTintColor: colors.accent
        }
      })

const MainNavigator = createDrawerNavigator(
  {
    Mealsfavs: {
      screen: MealsFavsTabNavigator,
      navigationOptions: { drawerLabel: 'Meals' }
    },
    Filters: FiltersNavigator
  },
  {
    contentOptions: {
      activeTintColor: colors.accent,
      labelStyle: {
        fontFamily: 'open-sans-bold'
      }
    }
  }
)

export default createAppContainer(MainNavigator)
