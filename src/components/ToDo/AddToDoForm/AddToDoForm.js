import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View, Text } from 'react-native';
import styled, { css } from '@emotion/native'
import { useDispatch, useSelector } from 'react-redux';
import { addToDo,  getToDo } from '../../Redux/Reducer/ToDoReducer';
import Container from '../../../EmotionComponents/Container';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import EStyleSheet from 'react-native-extended-stylesheet';
import { db } from './../../../../App';
import ThemeBySideShow from '../../SettingsTheme/Side/ThemeBySideShow/ThemeBySideShow';
import Card from '../../../EmotionComponents/Card';

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
		fontWeight:'800',
		marginBottom:5,
		
	}
})


const AddTodoForm = () => {
	const [todoTitle, setTodoTitle] = useState('');
	const [idData, setIdData] = useState('')
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);
	const themes= useSelector((state) => state.themes);


	const submitButtonClick = () => {
		const newId=new Date().valueOf();
		if (todoTitle) {
			db.transaction(txn => {
				txn.executeSql(
					`INSERT INTO todoList (id, title,completed) VALUES (?,?,0)`,
					[newId,todoTitle],
					(sqlTxn, res) => {
						console.log(`To Do  added successfully`, res,sqlTxn);
						console.log(newId);
						setIdData(res.insertId);
						console.log(idData,"idData")
					},
					error => {
						console.log('error on adding todo  ' + error.message);
					},
				);
			});
		}
		console.log(idData,"idData missing")
		if(idData){
			dispatch(
				addToDo({
					title: todoTitle,
					id:idData,
				})
			);
		}
	};
	return (
		<Card  bgColor={themes.drawerBgColor} height='200px'>
			<TextInput
				style={[styles.textInputStyle,{backgroundColor: themes.buttonBgColor, color: themes.textColor}]}
				onChangeText={title => setTodoTitle(title)}
				value={todoTitle}
				placeholder="ADD TO DO....."
				placeholderTextColor={themes.textColor} 
				keyboardType="default"
				tintColors='#F15927'
			/>
			<TouchableOpacity onPress={() => submitButtonClick()} style={[styles.touchableStyle,{backgroundColor:themes.buttonBgColor}]}>
				<Icon name="plus"
					color={themes.textColor}
					size={25}
				/>
				<Text style={[styles.addItemText,{color:themes.textColor}]}>Add Item</Text>
			</TouchableOpacity>
		</Card>
	);
};

export default AddTodoForm;
