import React from 'react';
import { db } from './../../App';
import { useDispatch } from 'react-redux';
import { useContext, useEffect } from 'react';
import { ToDoListContext } from '../components/Route/MainStackScreen/MainStackScreen';

const GetToDoDatabase = () => {
	// const [results, setResults] = useContext(ToDoListContext)
	const dispatch = useDispatch();
	useEffect(() => {
		db.transaction(txn => {
			txn.executeSql(
				`SELECT * FROM todoList ORDER BY id DESC`,
				[],
				(sqlTxn, res) => {
					console.log('Todos  retrieved successfully');
					let len = res.rows.length;
					if (len > 0) {
						const results = [];
						for (let i = 0; i < len; i++) {
							let item = res.rows.item(i);
							results.push({ id: item.id, title: item.title, completed: item.completed });
						}
						// getDatabaseData(results);
						// dispatch(getToDo([results]));
						console.log(results)
					}
				},
				error => {
					console.log('error on getting Todo ' + error.message);
				},
			);
		});
	})




	return (
		<></>
	);
};

export default GetToDoDatabase;