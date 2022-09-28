import { View, Text } from 'react-native'
import React from 'react'
import GettingWalkwayScreen from '../screen/GettingWalkwayScreen'

const GettingWalkwayContainer = ({navigation, route}) => {
    const handleClick = () => {
        navigation.navigate('CreateWalkway')
    }
  return (
    <GettingWalkwayScreen handleClick={handleClick} />
  )
}

export default GettingWalkwayContainer