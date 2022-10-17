import { ScrollView, StyleSheet, View,  } from 'react-native'
import React from 'react'
import BadgeList from '../components/BadgeList'
import { boldFontFamily } from '../../../constant/fonts'
import { blackColor } from '../../../constant/colors'
const BadgeListScreen = ({badgeList}) => {
  return (
    <View style={styles.container} >
        <BadgeList badgeList={badgeList}/>
    </View>
  )
}

export default BadgeListScreen

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flex: 1,
  },
  title:{
    fontFamily: boldFontFamily,
    fontSize: 16,
    color: blackColor,
    paddingBottom: 22,
  }
})