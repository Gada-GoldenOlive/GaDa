import { View, Text } from 'react-native'
import React from 'react'
import RecentScreen from '../screen/RecentScreen'

const RecentContainer = ({navigation, route}) => {
  const handleDetailPin = () => {
    navigation.navigate('DetailPin')
  }
  return (
   <RecentScreen handleDetailPin={handleDetailPin}/>
  )
}

export default RecentContainer