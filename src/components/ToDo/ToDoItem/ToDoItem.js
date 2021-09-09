import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteToDo, deleteToDoAsync, toggleComplete, getToDoAsync } from '../../Redux/Reducer/ToDoReducer';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';
import { UpdateToDoData } from '../../../SqliteDatabase/UpdateToDoData';
import EStyleSheet from 'react-native-extended-stylesheet';
import Card from '../../../EmotionComponents/Card';
import  NetInfo  from '@react-native-community/netinfo';
import { DeleteToDoData } from '../../../SqliteDatabase/DeleteToDoData';

const TodoItem = (props) => {
	const dispatch = useDispatch();
	// Destructuring id,title and completed
	const { _id,id, title, completed, sync } = props.todoData;
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

	const themes = useSelector((state) => state.themes);

	// delete click operation done by deleting data from redux toolkit and sqlite storage
	const handleDeleteClick = (_id) => {
		NetInfo.fetch().then(networkState => {
			if (networkState.isConnected==true  && networkState.isInternetReachable==true) {
				dispatch(deleteToDoAsync({ _id: _id }))
				// DeleteToDoData({_id:id})
			}
			else {
				// DeleteToDoData({_id:id})
				// dispatch(deleteToDo({ _id: _id }));
			}

		});
	}
	// delete click operation done by deleting data from redux toolkit and sqlite storage
	const handleUpdateCompleteClick = (_id, completed) => {
		NetInfo.fetch().then(networkState => {
			if (networkState.isConnected==true  && networkState.isInternetReachable==true) {
				dispatch(toggleCompleteAsync({ _id: _id, completed: !completed }))
				UpdateToDoData({ _id: _id, completed: !completed })
			}
			else {
				dispatch(toggleComplete({ _id: _id, completed: !completed }))
				UpdateToDoData({ _id: _id, completed: !completed })
			}

		});
	}


	return (
	
		//  <Card bgColor={themes.drawerBgColor}  >
		<View style={[styles.todoItemContainer,{backgroundColor:themes.drawerBgColor}]}>
			<View style={styles.todoFlex}>
				{
					(props.state == true && props.todoData) ?
						<CheckBox
							value={completedValue}
							onValueChange={() => handleUpdateCompleteClick(_id, completed)}
							style={styles.checkbox}
						/> : <></>
				}
				<Text style={{ color: themes.textColor, marginTop: 0, paddingLeft: 20 }}>{title}</Text>
			</View>
			<TouchableOpacity style={{ paddingHorizontal: 20, paddingVertical: 0, marginTop: 0, alignSelf: 'flex-end', justifyContent: 'center',alignItems:'center' }} >
				<Icon.Button name="ios-trash" color={themes.textColor} size={25} backgroundColor={themes.drawerBgColor}
					onPress={() => handleDeleteClick(_id)}></Icon.Button>
			</TouchableOpacity>
		</View>
		//   </Card>
	);
};


const styles = EStyleSheet.create({
	checkbox: {

	},
	todoItemContainer:{
      flexDirection:'row',
	  justifyContent:'space-between',
	  marginBottom:5,
	  marginTop:5,
	  marginLeft:'5%',
	  marginRight:'5%',
	  borderRadius:10
	},
	todoFlex: {
		flexDirection: 'row',
		marginTop: 12,

	},
})

export default TodoItem;
