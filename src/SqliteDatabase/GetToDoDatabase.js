// import React from 'react';
// import { db } from './../../App';
// import { useDispatch } from 'react-redux';
// import { useContext, useEffect } from 'react';
// import { ResultContext } from '../components/Route/MainStackScreen/MainStackScreen';

// const GetToDoDatabase = () => {
// 	const [results, setResults] = useContext(ResultContext);

// 	const dispatch = useDispatch();
// 	useEffect(() => {
// 		db.transaction(txn => {
// 			txn.executeSql(
// 				`SELECT * FROM ListToDo ORDER BY _id DESC`,
// 				[],
// 				(sqlTxn, res) => {
// 					console.log('Todos  retrieved successfully');
// 					let len = res.rows.length;
// 					if (len > 0) {
// 						const results = [];
// 						for (let i = 0; i < len; i++) {
// 							let item = res.rows.item(i);
// 							results.push({ _id: item._id, title: item.title, completed: item.completed, sync: item.sync, email: item.email });
// 						}
// 						// getDatabaseData(results);
// 						NetInfo.fetch().then(networkState => {
// 							if(networkState.isConnected){
// 								dispatch(getToDoAsync({email:auths.email}))
// 							}
// 							else{
// 								dispatch(getToDo([results]));
// 							}

// 						});
// 						console.log(results)
// 					}
// 				},
// 				error => {
// 					console.log('error on getting Todo ' + error.message);
// 				},
// 			);
// 		});
// 	})




// 	return (
// 		<></>
// 	);
// };

// export default GetToDoDatabase;