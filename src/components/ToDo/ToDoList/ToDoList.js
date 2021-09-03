import React, { useEffect, useState } from 'react';
import ToDoItem from '../ToDoItem/ToDoItem';
import { useSelector, useDispatch } from 'react-redux';
import { getToDo, getToDoAsync } from '../../Redux/Reducer/ToDoReducer';
import { FlatList, Text } from 'react-native';
import { useContext } from 'react';
import { ToDoListContext } from '../../Route/MainStackScreen/MainStackScreen';
import { db } from './../../../../App';


const TodoList = () => {
	// Getting values of auth and todos list from redux toolkit
	const dispatch = useDispatch();
	const todos = useSelector((state) => state.todos);
	const [results, setResults] = useContext(ToDoListContext)

	// Receiving data from the Sqlite database

	useEffect(() => {
		setResults([])
		db.transaction(txn => {
			txn.executeSql(
				`SELECT * FROM todoList ORDER BY id DESC`,
				[],
				(sqlTxn, res) => {
					console.log('Todos  retrieved successfully');
					let len = res.rows.length;
					if (len > 0 && results.length==0) {
					    console.log(results,"results")
						for (let i = 0; i < len; i++) {
							let item = res.rows.item(i);
							results.push({ id: item.id, title: item.title, completed: item.completed });
						}
					    dispatch(getToDo([results]));
					}
				},
				error => {
					console.log('error on getting Todo ' + error.message);
				},
			);
		});
	}, [])
	console.log(todos)

	return (
		// retrieving Todo list from database
		<>
			<Text>{todos.length}</Text>
			<FlatList
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					marginTop: 10,
					paddingBottom: 50,
				}}
				
				keyExtractor={(item) => `${item.id}`}
				data={todos}
				renderItem={itemData =>
					<ToDoItem todoData={itemData.item} id={itemData.item.id} state={true}></ToDoItem>
				}
			>
			</FlatList>
		</>
	);
};

export default TodoList;