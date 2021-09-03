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

const styles = EStyleSheet.create({
	$textColor: '#0275d8',
	addBtn: {
		width: 90,
		height: 40,
		marginTop: 10,
		marginBottom: 10,
		backgroundColor: 'white',
		borderRadius: 10
	},
	touchableStyle: {
		textAlign: 'center',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '$BgColorBody',
		padding: 9,
		borderRadius: 20
	},
	addItemText: {
		color: 'white',
		fontSize: 20,
	},
	textInputStyle: {
		height: 50,
		padding: 8,
		margin: 5,
		fontSize: 16,
		backgroundColor: '#fff',
		color: 'black'
	}
})


const AddTodoForm = () => {
	const [todoTitle, setTodoTitle] = useState('');
	const [idData, setIdData] = useState('')
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);


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
		<View >
			<TextInput
				style={styles.textInputStyle}
				onChangeText={title => setTodoTitle(title)}
				value={todoTitle}
				placeholder="ADD TO DO....."
				keyboardType="default"
			/>
			<TouchableOpacity onPress={() => submitButtonClick()} style={styles.touchableStyle}>
				<Icon name="plus"
					color='white'
					size={25}
				/>
				<Text style={styles.addItemText}>Add Item</Text>
			</TouchableOpacity>
		</View>
	);
};

export default AddTodoForm;
