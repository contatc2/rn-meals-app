import React from 'react'
import { useSelector } from 'react-redux'

import { CATEGORIES } from '../data/dummy-data'
import MealList from '../components/MealList'

const getCategory = props => {
  const catId = props.navigation.getParam('categoryId')
  return CATEGORIES.find(cat => cat.id === catId)
}

const CategoryMealsScreen = props => {
  const catId = props.navigation.getParam('categoryId')

  const availableMeals = useSelector(state => state.meals.filteredMeals)

  const displayedMeals = availableMeals.filter(
    meal => meal.categoryIds.indexOf(catId) >= 0
  )

  return <MealList listData={displayedMeals} navigation={props.navigation} />
}

CategoryMealsScreen.navigationOptions = navigationData => {
  const selectedCategory = getCategory(navigationData)
  return {
    headerTitle: selectedCategory.title
  }
}

export default CategoryMealsScreen
