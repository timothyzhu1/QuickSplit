import React from 'react'
import { Text, TouchableOpacity, StyleSheet} from 'react-native'
import {withNavigation} from 'react-navigation'


const NavLink = ({navigation, text, routeName}) => {
  return (
    <TouchableOpacity onPress = {() => navigation.navigate(routeName)}>
      <Text style = {styles.container}>{text}</Text>
    </TouchableOpacity>
  )

}
const styles = StyleSheet.create({
    container: {
        fontSize: 15,
        fontFamily: 'Kohinoor Bangla',
        color: 'blue',
        alignSelf: 'center'
    }
})

export default withNavigation(NavLink)
