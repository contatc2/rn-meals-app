import { Platform } from 'react-native'
import { createStackNavigator, createAppContainer } from 'react-navigation'

import colors from '../constants/colors'
import CategoriesScreen from '../screens/CategoriesScreen'
import CategoryMealsScreen from '../screens/CategoryMealsScreen'
import MealDetailsScreen from '../screens/MealDetailsScreen'

const MealsNavigator = createStackNavigator(
  {
    Categories: CategoriesScreen,
    CategoryMeals: CategoryMealsScreen,
    MealDetails: MealDetailsScreen
  },
  {
    mode: 'modal',
    // initialRouteName: 'Categories',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? colors.primary : 'white'
      },
      headerTintColor: Platform.OS === 'android' ? 'white' : colors.primary
    }
  }
)

export default createAppContainer(MealsNavigator)
