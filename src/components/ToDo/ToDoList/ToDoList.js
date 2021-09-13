import React, { useEffect, useState } from 'react';
import ToDoItem from '../ToDoItem/ToDoItem';
import { useSelector, useDispatch } from 'react-redux';
import { getToDo, getToDoAsync, addToDoAsync, addToDoUpdateAsync } from '../../Redux/Reducer/ToDoReducer';
import { FlatList, Text, View, AppState } from 'react-native';
import { useContext } from 'react';
import { db } from './../../../../App';
import { ResultContext } from '../../Route/MainStackScreen/MainStackScreen';
import NetInfo from '@react-native-community/netinfo';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PickerIOSItem } from 'react-native';


const TodoList = () => {
	// Getting values of auth and todos list from redux toolkit
	const dispatch = useDispatch();
	const todos = useSelector((state) => state.todos);
	const auths = useSelector((state) => state.auth);
	const [results, setResults] = useContext(ResultContext)
	const [appState, setAppState] = useState(AppState.currentState);

	useEffect(() => {
		// Accessing all value from localdb when app is  started. It has no dependency. 
		// If net connection is available at first step i have adding all data which are not added to the database and update all data which are updated only in local database and deletin element from mongodb.
		NetInfo.fetch().then(networkState => {
			console.log(networkState)
			if (networkState.isConnected == true && networkState.isInternetReachable == true) {
		
				db.transaction(txn => {
					txn.executeSql(
						`SELECT * FROM ListToDo ORDER BY id DESC`,
						[],
						(sqlTxn, res) => {
							let len = res.rows.length;
							console.log(res.rows, "response of rows at local storage")
							if (len > 0) {
								console.log(len, "len at mongodb")
								for (let i = 0; i < len; i++) {
									let item = res.rows.item(i);
									// If item contain sync property as 0 and item has no mongodb id, then just storin it to the mongodb.
									if (item.sync == 0 && (item.id == item._id)) {
										dispatch(addToDoUpdateAsync({ id: item.id, sync: 1, title: item.title, syncTime: item.syncTime, completed: item.completed, email: item.email, }))
									}
									// If data already available at mongodb and data has been updated at local db then just updated it at mongodb
									if (item.sync == 0 && (item.id != item._id)) {
										console.log(item.id != item._id, "comparing item.id !=item.id")
										dispatch(toggleCompleteAsync({ _id: item._id, id:item.id, completed: item.completed, sync: 1, state: true }))
									}
									// If data has sync property as 2 , then just delete it from database .
									if(item.sync==2){
										dispatch(deleteToDoAsync({ _id: item._id }))
									}
								}
							}

						},
						error => {
							console.log('error on getting Todo ' + error.message);
						},
					);
				})
				// dispatch(getToDoAsync({ email: auths.email }))
			}
			else {
				setResults([]);
				db.transaction(txn => {
					txn.executeSql(
						`SELECT * FROM ListToDo ORDER BY id DESC`,
						[],
						(sqlTxn, res) => {
							console.log('Todos  retrieved at offline successfully');
							let len = res.rows.length;
							console.log(len, 'total data length at todolist offline')
							if (len > 0 && results.length == 0) {
								for (let i = 0; i < len; i++) {
									let item = res.rows.item(i);
									console.log(item, "response from todo list 70line");
									results.push({ _id: item._id, id: item.id, sync: item.sync, title: item.title, syncTime: item.syncTime, completed: item.completed, email: item.email, });
								}
								dispatch(getToDo([results]));
							}
						},
						error => {
							console.log('error on getting Todo ' + error.message);
						},
					);
				})
			}
		})
	}, [])

	useEffect(() => {
		const intervalId = setInterval(() => {
			NetInfo.fetch().then(networkState => {
				console.log(networkState)
				// if net connection is available then i will add all data from mongodb and from local database i will store only those value which sync value is 0.
				if (networkState.isConnected == true && networkState.isInternetReachable == true) {
					dispatch(getToDoAsync({ email: auths.email }))
				}
				// if net connection is not  available then reading only from local database
				else {
					setResults([]);
					db.transaction(txn => {
						txn.executeSql(
							`SELECT * FROM ListToDo ORDER BY id DESC`,
							[],
							(sqlTxn, res) => {
								console.log('Todos  retrieved at offline successfully');
								let len = res.rows.length;
								console.log(len, 'total data length at todolist offline')
								if (len > 0 && results.length == 0) {
									for (let i = 0; i < len; i++) {
										let item = res.rows.item(i);
										console.log(item, "response from todo list 70line");
										results.push({ _id: item._id, id: item.id, sync: item.sync, title: item.title, syncTime: item.syncTime, completed: item.completed, email: item.email, });
									}
									dispatch(getToDo([results]));
								}
							},
							error => {
								console.log('error on getting Todo ' + error.message);
							},
						);
					})
				}
			});
		}, 13000)
		if (appState =='background') {
			setTimeout(function () {
				clearInterval(intervalId);
			},100);
		}
	}, [todos.length || auths.email])


console.log(appState, "appstate from todolist")


// console.log(appState)

console.log(todos, "todos length")
console.log(auths.email, "auths email from data")

return (
	<SafeAreaView style={{ flex: 1 }}>
		<FlatList
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{
				marginTop: 5,
				paddingBottom: 50,
			}}
			keyExtractor={(item) => `${item.id}`}
			data={todos}
			renderItem={itemData =>
				<ToDoItem todoData={itemData.item} id={itemData.item.id} state={true}></ToDoItem>
			}
		>
		</FlatList>
	</SafeAreaView>
);
};

export default TodoList;


