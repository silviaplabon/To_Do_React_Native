import React, { useEffect, useState } from 'react';
import ToDoItem from '../ToDoItem/ToDoItem';
import { useSelector, useDispatch } from 'react-redux';
import { getToDo, getToDoAsync, addToDoAsync } from '../../Redux/Reducer/ToDoReducer';
import { FlatList, Text, View } from 'react-native';
import { useContext } from 'react';
import { db } from './../../../../App';
import { ResultContext } from '../../Route/MainStackScreen/MainStackScreen';
import NetInfo from '@react-native-community/netinfo';
import { SafeAreaView } from 'react-native-safe-area-context';

const TodoList = () => {
	// Getting values of auth and todos list from redux toolkit
	const dispatch = useDispatch();
	const todos = useSelector((state) => state.todos);
	const auths = useSelector((state) => state.auth);
	const [results, setResults] = useContext(ResultContext)
	// Receiving data from the Sqlite database

	// useEffect(() => {
	// 	NetInfo.fetch().then(networkState => {
	// 		if (networkState.isConnected) {
	// 			dispatch(getToDoAsync({ email: auths.email }))
	// 		}
	// 		console.log(auths.email)
	// 	})
	// }, [])


	useEffect(() => {
		NetInfo.fetch().then(networkState => {
			console.log(networkState)
			// if net connection is available then i will add all data from mongodb and from local database i will store only those value which sync value is 0.
			if(networkState.isConnected==true && networkState.isInternetReachable==true){
				dispatch(getToDoAsync({ email: auths.email }))
				db.transaction(txn => {
					txn.executeSql(
						`SELECT * FROM ListToDo ORDER BY id DESC`,
						[],
						(sqlTxn, res) => {
							console.log('Todos  retrieved successfully');
							let len = res.rows.length;
							if (len > 0 && results.length == 0) {
								for (let i = 0; i < len; i++) {
									let item = res.rows.item(i);
									if (item.sync == 0) {
										console.log(item.sync, "item sync value is 0 now i will convert it to 1")
										dispatch(addToDoAsync({id:item.id,sync:1, title: item.title,syncTime:item.syncTime,  completed: item.completed, email: item.email,  }))
									}
								}
							}
						},
						error => {
							console.log('error on getting Todo ' + error.message);
						},
					);
				})
			}
			// if net connection is not  available then reading only from local database
			else {
				setResults([]);
				db.transaction(txn => {
					txn.executeSql(
						`SELECT * FROM ListToDo ORDER BY id DESC`,
						[],
						(sqlTxn, res) => {
							console.log('Todos  retrieved successfully');
							let len = res.rows.length;
							if (len > 0 && results.length == 0) {
								for (let i = 0; i < len; i++) {
									let item = res.rows.item(i);
									console.log(item)
									results.push({ _id: item._id, title: item.title, completed: item.completed, email: item.email, sync: item.sync });
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
	}, [todos.length || auths.email])
	console.log(todos, "todos length")
	console.log(auths.email,"auths email from data")

	return (
		<SafeAreaView style={{flex: 1}}>
			<FlatList
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					marginTop: 5,
					paddingBottom: 50,
				}}
				keyExtractor={(item) => `${item._id}`}
				data={todos}
				renderItem={itemData =>
					<ToDoItem todoData={itemData.item} id={itemData.item._id} state={true}></ToDoItem>
				}
			>
			</FlatList>
		</SafeAreaView>
	);
};

export default TodoList;


	