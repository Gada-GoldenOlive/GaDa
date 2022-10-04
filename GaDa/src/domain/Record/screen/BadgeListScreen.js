import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BadgeList from '../components/BadgeList'
import { boldFontFamily } from '../../../constant/fonts'
import { blackColor } from '../../../constant/colors'
const BadgeListScreen = () => {
  return (
    <ScrollView style={styles.container} bounces={false} showsVerticalScrollIndicator={false} >
        <BadgeList />
    </ScrollView>
  )
}

export default BadgeListScreen

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 43.8,
    flex: 1,
  },
  title:{
    fontFamily: boldFontFamily,
    fontSize: 16,
    color: blackColor,
    paddingBottom: 22,
  }
})