import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, TouchableOpacity, StyleSheet, Text, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { updateButtonBgColor, updateDrawerBgColor, updateTextColor,updateThemeBgColor } from '../../Redux/Reducer/ThemeReducer';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Colors } from 'react-native-paper';


const SettingsThemeDetails = (props) => {
    // console.log()
	const dispatch = useDispatch();
    const themes = useSelector((state) => state.themes);
    // console.log(themes,"themes color code fro updating")
    // // Destructuring id,textColor, backgroundColor

	const { color,state} = props;
    
    // console.log(buttonBgColor,"buttonBgColor")

    const handleUpdateColor=(color)=>{
        {
            state==1 &&   dispatch(updateTextColor(color));
        } 
        {
            state==2 &&  dispatch(updateButtonBgColor(color));
        }
        {
            state==3 && dispatch(updateThemeBgColor(color))
        }
        {
            state==4 &&  dispatch(updateDrawerBgColor(color));
        }
    }
	return (
		<Button style={[styles.todoContainer,{backgroundColor:color }]} onPress={() => handleUpdateColor(color)}>
			{/* <TouchableOpacity style={{ paddingHorizontal: 2, paddingVertical: 2, height: 50, alignSelf: 'center' }} >
			</TouchableOpacity> */}
		</Button>
	);
};


const styles = EStyleSheet.create({
	todoFlex: {
		flexDirection: 'row',
		justifyContent: 'space-evenly'
	},

	todoContainer: {
		width: '7%',
		// shadowColor: 'black',
		// shadowOffset: { width: 0, height: 2 },
		// shadowRadius: 6,
		// shadowOpacity: 0.20,
		// elevation: 8,
		// padding: 5,
		borderRadius: 40,
		marginLeft: '1%',
		marginTop: 3,
		marginBottom: 1,
        paddingBottom:0,
		marginRight: '1%',
		// flexDirection: 'row',
		// justifyContent: 'space-between',
		// alignItems: 'center'
	},

})

export default SettingsThemeDetails;
