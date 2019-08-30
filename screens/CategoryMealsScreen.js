import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'

import { CATEGORIES } from '../data/dummy-data'

const getCategory = props => {
  const catId = props.navigation.getParam('categoryId')
  return CATEGORIES.find(cat => cat.id === catId)
}

const CategoryMealsScreen = props => {
  const selectedCategory = getCategory(props)
  console.log(selectedCategory)

  return (
    <View style={styles.screen}>
      <Text>{selectedCategory.title}</Text>
      <Button
        title="Go to Meal Details"
        onPress={() => props.navigation.navigate('MealDetails')}
      />
    </View>
  )
}

CategoryMealsScreen.navigationOptions = navigationData => {
  const selectedCategory = getCategory(navigationData)
  return {
    headerTitle: selectedCategory.title
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default CategoryMealsScreen
