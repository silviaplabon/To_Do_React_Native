
import { db } from './../../App';
export const addTodoDatabase= (props) => {
  const {_id,id,sync,title,syncTime,completed,email}=props;
  console.log(id)
    if (!title) {
      alert('Enter category');
      return false;
    }
    	db.transaction(txn => {
				txn.executeSql(
					`INSERT INTO ListToDo( _id,id,sync,title,syncTime,completed,email ) VALUES (?,?,?,?,?,?,?)`,
					[_id,id,sync, title, syncTime,completed,email],
					(sqlTxn, res) => {
						console.log(`To Do  added successfully`, res, sqlTxn);
					},
					error => {
						console.log('error on adding todo  ' + error.message);
					},
				);
			});

  };
