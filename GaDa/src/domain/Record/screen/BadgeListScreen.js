import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const BadgeListScreen = () => {
  return (
    <ScrollView style={styles.container}  bounces={false} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>산책</Text>
        
    </ScrollView>
  )
}

export default BadgeListScreen

const styles = StyleSheet.create({})