import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteToDo, deleteToDoAsync, toggleComplete, getToDoAsync, toggleCompleteAsync, deleteToDoWithDBId } from '../../Redux/Reducer/ToDoReducer';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';
import { UpdateToDoData } from '../../../SqliteDatabase/UpdateToDoData';
import EStyleSheet from 'react-native-extended-stylesheet';
import Card from '../../../EmotionComponents/Card';
import NetInfo from '@react-native-community/netinfo';
import { DeleteToDoData } from '../../../SqliteDatabase/DeleteToDoData';
import NavigationService from '../../../Services/NavigationService';


const TodoItem = (props) => {
	const dispatch = useDispatch();
	// Destructuring id,title and completed
	const { _id, id, title, completed, sync } = props.todoData;
	const [completedValue, setCompletedValue] = useState('')
	console.log(completed, "completed value normal")

	// handling boolean data , if it's 0 then converting to false and otherwise it will be true.  When Completed value will change then completedValue will be updated.
	useEffect(() => {
		if (completed == 0) {
			setCompletedValue(false);
		}
		else {
			setCompletedValue(true)
		}
	}, [])

	const themes = useSelector((state) => state.themes);

	// delete click operation done by deleting data from redux toolkit and sqlite storage
	const handleDeleteClick = (_id, id,completed) => {
		NetInfo.fetch().then(networkState => {
			if (networkState.isConnected == true && networkState.isInternetReachable == true) {
				dispatch(deleteToDoAsync({ _id: _id }))
				// DeleteToDoData({_id:id})
			}
			else {
				// DeleteToDoData({_id:_id})
				if (_id == id) {
					dispatch(deleteToDo({ _id: _id, id: id }));
				}
				else if (id != _id) {
                    dispatch(deleteToDoWithDBId({ _id: _id, id: id, completed:completed }));
				}
			}
		});
	}
	// delete click operation done by deleting data from redux toolkit and sqlite storage
	const handleUpdateCompleteClick = (_id, completed, sync, id ) => {
		console.log(_id,completed,"completed",sync,id,"from handle complete click at todo item 54 line")
		NetInfo.fetch().then(networkState => {
			if (networkState.isConnected == true && networkState.isInternetReachable == true) {
				{
					completed == 0 ? dispatch(toggleCompleteAsync({ _id: _id, id:id, completed: 1, sync: sync, state: false })) : dispatch(toggleCompleteAsync({ _id: _id,id:id, completed: 0, sync: sync, state: false }))
				}
				// dispatch(toggleCompleteAsync({ _id: item._id, id:item.id, completed: item.completed, sync: 1, state: true }))
				// { completed == 0 ? setCompletedValue(true) : setCompletedValue(false) }
			}
			else {
				{
					completed == 0 ? dispatch(toggleComplete({ _id: _id, completed: 1, sync: 0 })) : dispatch(toggleComplete({ _id: _id, completed: 0, sync: 0 }))
				}
				// UpdateToDoData({ _id: _id, completed: !completed })
			}

		});
	}


	return (
		//  <Card bgColor={themes.drawerBgColor}  >
		<>
			{
				(sync == 0 || sync == 1)
				&&
				<View style={[styles.todoItemContainer, { backgroundColor: themes.drawerBgColor }]}>
					<View style={styles.todoFlex}>
						{
							(props.state == true) ?
								<CheckBox
									value={completedValue}
									onValueChange={() => handleUpdateCompleteClick(_id, completed, sync,id)}
									// onPress={()=>handleUpdateCompleteClick(_id, completed,sync)}
									style={styles.checkbox}
								/> : <></>
						}
						<Text style={{ color: themes.textColor, marginTop: 0, paddingLeft: 20 }}>{title}</Text>
					</View>
					<TouchableOpacity style={{ paddingHorizontal: 20, paddingVertical: 0, marginTop: 0, alignSelf: 'flex-end', justifyContent: 'center', alignItems: 'center' }} >
						<Icon.Button name="ios-trash" color={themes.textColor} size={25} backgroundColor={themes.drawerBgColor}
							onPress={() => handleDeleteClick(_id, id,completed)}></Icon.Button>
					</TouchableOpacity>
				</View>
			}
		</>
		//   </Card>
	);
};


const styles = EStyleSheet.create({
	checkbox: {

	},
	todoItemContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 5,
		marginTop: 5,
		marginLeft: '5%',
		marginRight: '5%',
		borderRadius: 10
	},
	todoFlex: {
		flexDirection: 'row',
		marginTop: 12,

	},
})

export default TodoItem;
