import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, StyleSheet, Switch, Platform } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import HeaderButton from '../components/HeaderButton'
import colors from '../constants/colors'

const FilterSwitch = props => {
  return (
    <View style={styles.filterContainer}>
      <Text>{props.label}</Text>
      <Switch
        trackColor={{ true: colors.primary }}
        thumbColor={Platform.OS === 'android' ? colors.primary : ''}
        value={props.state}
        onValueChange={props.onChange}
      />
    </View>
  )
}

const FiltersScreen = props => {
  const { navigation } = props

  const [isGlutenFree, setIsGlutenFree] = useState(false)
  const [isLactoseFree, setIsLactoseFree] = useState(false)
  const [isVegetarian, setIsVegetarian] = useState(false)
  const [isVegan, setIsVegan] = useState(false)

  const saveFilters = useCallback(() => {
    const appliedFilters = {
      glutenFree: isGlutenFree,
      lactoreFree: isLactoseFree,
      vegetarian: isVegetarian,
      vegan: isVegan
    }
    console.log(appliedFilters)
  }, [isGlutenFree, isLactoseFree, isVegetarian, isVegan])

  useEffect(() => {
    navigation.setParams({ save: saveFilters })
  }, [saveFilters])

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>AvailableFilters/Restrictions</Text>
      <FilterSwitch
        label="Gluten-free"
        state={isGlutenFree}
        onChange={newValue => setIsGlutenFree(newValue)}
      />
      <FilterSwitch
        label="Lactose-free"
        state={isLactoseFree}
        onChange={newValue => setIsLactoseFree(newValue)}
      />
      <FilterSwitch
        label="Vegetarian"
        state={isVegetarian}
        onChange={newValue => setIsVegetarian(newValue)}
      />
      <FilterSwitch
        label="Vegan"
        state={isVegan}
        onChange={newValue => setIsVegan(newValue)}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    margin: 20,
    textAlign: 'center'
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginVertical: 15
  }
})

FiltersScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Filters',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="menu"
          iconName="ios-menu"
          onPress={() => navData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="save"
          iconName="ios-save"
          onPress={navData.navigation.getParam('save')}
        />
      </HeaderButtons>
    )
  }
}

export default FiltersScreen
