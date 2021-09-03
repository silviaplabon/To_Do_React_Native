import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { deleteToDo, deleteToDoAsync, toggleComplete } from '../../Redux/Reducer/ToDoReducer';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import DescriptionTag from '../../../EmotionComponents/DescriptionTag';
import Icon from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';
import { UpdateToDoData } from '../../../SqliteDatabase/UpdateToDoData';
import { DeleteToDoData } from '../../../SqliteDatabase/DeleteToDoData';

const TodoItem = (props) => {

	const dispatch = useDispatch();

	// Destructuring id,title and completed
	const { id, title, completed } = props.todoData;

	const [completedValue, setCompletedValue] = useState('')

	// handling boolean data , if it's 0 then converting to false and otherwise it will be true.  When Completed value will change then completedValue will be updated.
	useEffect(() => {
		if (completed == 0) {
			setCompletedValue(false);
		}
		else {
			setCompletedValue(true)
		}
	}, [completed])

	// delete click operation done by deleting data from redux toolkit and sqlite storage
	const handleDeleteClick = (id) => {
		DeleteToDoData({id:id})
		dispatch(deleteToDo({ id: id }));
	};

	// delete click operation done by deleting data from redux toolkit and sqlite storage
	const handleUpdateCompleteClick = (id, completed) => {
        UpdateToDoData({id:id,completed:!completed})
		dispatch(toggleComplete({ id: id, completed: !completed }))
	}

	return (
		<View style={styles.todoContainer}>
			<View style={styles.todoFlex}>
				{
					props.state == true ?
						<CheckBox
							value={completedValue}
							onValueChange={() => handleUpdateCompleteClick(id, completed)}
							style={styles.checkbox}
						/> : <></>
				}
				<DescriptionTag text={title} ></DescriptionTag>
			</View>
			<TouchableOpacity style={{ paddingHorizontal: 20, paddingVertical: 2, height: 50, alignSelf: 'flex-end' }} >
				<Icon.Button name="ios-trash" color='black' size={32} backgroundColor='white'
					onPress={() => handleDeleteClick(id)}></Icon.Button>
			</TouchableOpacity>
		</View>
	);
};


const styles = StyleSheet.create({
	checkbox: {
		padding: 2,
		height: 20,
		width: 20,
		marginRight: 20
	},
	todoFlex: {
		flexDirection: 'row',
		justifyContent: 'space-evenly'
	},
	todoContainer: {
		width: '90%',
		height: 60,
		shadowColor: 'black',
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 6,
		shadowOpacity: 0.20,
		elevation: 8,
		padding: 10,
		backgroundColor: 'white',
		borderRadius: 10,
		marginLeft: '5%',
		marginTop: 10,
		marginBottom: 3,
		marginRight: '5%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},

})

export default TodoItem;
