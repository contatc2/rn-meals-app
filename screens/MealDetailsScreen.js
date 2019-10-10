import React, { useEffect, useCallback } from 'react'
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector, useDispatch } from 'react-redux'

import HeaderButton from '../components/HeaderButton'
import DefaultText from '../components/DefaultText'
import { toggleFavourite } from '../store/actions/meals'

const ListItem = props => {
  return (
    <View style={styles.listItem}>
      <DefaultText>{props.children}</DefaultText>
    </View>
  )
}

const MealDetailsScreen = props => {
  const availableMeals = useSelector(state => state.meals.meals)
  const mealId = props.navigation.getParam('mealId')
  const selectedMeal = availableMeals.find(meal => meal.id === mealId)

  const dispatch = useDispatch()
  const toggleFavouriteHandler = useCallback(() => {
    dispatch(toggleFavourite(mealId))
  }, [dispatch, mealId])

  useEffect(() => {
    props.navigation.setParams({ toggleFav: toggleFavouriteHandler })
  }, [toggleFavouriteHandler])

  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <DefaultText>{selectedMeal.duration}m</DefaultText>
        <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {selectedMeal.ingredients.map(ingredient => (
        <ListItem key={ingredient}>{ingredient}</ListItem>
      ))}
      <Text style={styles.title}>Steps</Text>
      {selectedMeal.steps.map(step => (
        <ListItem key={step}>{step}</ListItem>
      ))}
    </ScrollView>
  )
}

MealDetailsScreen.navigationOptions = navData => {
  const toggleFavourite = navData.navigation.getParam('toggleFav')
  return {
    headerTitle: navData.navigation.getParam('mealTitle'),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="favourite" iconName="ios-star" onPress={toggleFavourite} />
      </HeaderButtons>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200
  },
  details: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-around'
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    textAlign: 'center'
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10
  }
})

export default MealDetailsScreen
