import React from 'react'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector } from 'react-redux'

import HeaderButton from '../components/HeaderButton'
import MealList from '../components/MealList'

const FavouritesScreen = props => {
  const favMeals = useSelector(state => state.meals.favouriteMeals)

  return <MealList listData={favMeals} navigation={props.navigation} />
}

FavouritesScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Your favourites',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="menu"
          iconName="ios-menu"
          onPress={() => navData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    )
  }
}

export default FavouritesScreen
