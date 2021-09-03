import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, TouchableOpacity, StyleSheet,Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { updateButtonBgColor, updateTextColor,updateThemeBgColor } from '../../Redux/Reducer/ThemeReducer';
import EStyleSheet from 'react-native-extended-stylesheet';


const SettingsThemeShow = (props) => {
    console.log(props, props.data,"data")
	const dispatch = useDispatch();
    const themes = useSelector((state) => state.themes);
    console.log(themes,"themes color code fro updating")
    // // Destructuring id,textColor, backgroundColor

	const { data,state,title} = props;
    
    // console.log(buttonBgColor,"buttonBgColor")

    const handleUpdateColor=()=>{
        {
            state==1 &&   dispatch(updateTextColor());
        }
        {
            state==2 && dispatch(updateThemeBgColor())
        }
        {
            state==3 &&  dispatch(updateButtonBgColor());
        }
        {
            state==4 &&  dispatch(updateDrawerBgColor());
        }
    }
	return (
		<View style={[styles.todoContainer,{backgroundColor:data}]}>
			<TouchableOpacity style={{ paddingHorizontal: 2, paddingVertical: 2, height: 50, alignSelf: 'center' }} onPress={() => handleUpdateColor(data)}>
                    <Text style={{color:'white'}}>{title}</Text>
			</TouchableOpacity>
		</View>
	);
};


const styles = EStyleSheet.create({
	todoFlex: {
		flexDirection: 'row',
		justifyContent: 'space-evenly'
	},

	todoContainer: {
		width: '22%',
		shadowColor: 'black',
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 6,
		shadowOpacity: 0.20,
		elevation: 8,
		// padding: 5,
		borderRadius: 10,
		marginLeft: '1%',
		marginTop: 10,
		marginBottom: 3,
		marginRight: '1%',
		// flexDirection: 'row',
		// justifyContent: 'space-between',
		// alignItems: 'center'
	},

})

export default SettingsThemeShow;
