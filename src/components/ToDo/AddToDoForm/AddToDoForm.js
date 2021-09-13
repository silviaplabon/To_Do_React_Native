import React, { useContext, useState } from 'react';
import { TextInput, TouchableOpacity, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addToDo, addToDoAsync, getToDo } from '../../Redux/Reducer/ToDoReducer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Card from '../../../EmotionComponents/Card';

import EStyleSheet from 'react-native-extended-stylesheet';
import { addTodoDatabase } from '../../../SqliteDatabase/AddTodoDatabase';
import NetInfo from '@react-native-community/netinfo';
import { NavigationContainer } from '@react-navigation/native';
import NavigationService from '../../../Services/NavigationService';

const styles = EStyleSheet.create({
	addBtn: {
		width: 90,
		height: 40,
		marginTop: 10,
		borderRadius: 10
	},
	touchableStyle: {
		textAlign: 'center',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '$buttonColor',
		padding: 9,
		borderRadius: 20
	},
	addItemText: {
		fontSize: 20,
	},
	textInputStyle: {
		height: 50,
		padding: 10,
		fontSize: 18,
		fontWeight: '800',
		marginBottom: 5,

	}
})


const AddTodoForm = () => {
	const [todoTitle, setTodoTitle] = useState('');
	const [idData, setIdData] = useState('')
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);
	const themes = useSelector((state) => state.themes);


	const submitButtonClick = () => {
		NetInfo.fetch().then(networkState => {
			let syncTimes= new Date().getTime();
			if (networkState.isConnected == true && networkState.isInternetReachable==true) {
				dispatch(addToDoAsync({ id:syncTimes, sync: 1, title: todoTitle,  syncTime: syncTimes, completed: 0, email: auth.email, }))
				NavigationService.navigate('ProfileScreen')
				// addTodoDatabase({_id: syncTime, title: todoTitle, completed: 0, email: auth.email, sync: 1	})
			}
			else {
				console.log('net connection is off , so i am saving it to the local database')
				// addTodoDatabase({_id: syncTime, title: todoTitle, completed: 0, email: auth.email, sync: 0	})
				dispatch(addToDo({_id:syncTimes, id:syncTimes, sync: 0, title: todoTitle,  syncTime: syncTimes, completed: 0, email: auth.email, }))
				NavigationService.navigate('ProfileScreen')
			}
		});
	};
	return (
		<Card  >
			<TextInput
				style={[styles.textInputStyle, { backgroundColor: themes.buttonBgColor, color: themes.textColor }]}
				onChangeText={title => setTodoTitle(title)}
				value={todoTitle}
				placeholder="ADD TO DO....."
				placeholderTextColor={themes.textColor}
				keyboardType="default"
				tintColors='#F15927'
			/>
			<TouchableOpacity onPress={() => submitButtonClick()} style={[styles.touchableStyle, { backgroundColor: themes.buttonBgColor }]}>
				<Icon name="plus"
					color={themes.textColor}
					size={25}
				/>
				<Text style={[styles.addItemText, { color: themes.textColor }]}>Add Item</Text>
			</TouchableOpacity>
		</Card>
	);
};

export default AddTodoForm;
