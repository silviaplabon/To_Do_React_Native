
import { db } from './../../App';
export const addTodoDatabase= (category) => {
    if (!category) {
      alert('Enter category');
      return false;
    }
    db.transaction(txn => {
      txn.executeSql(
        `INSERT INTO todoList (title, completed) VALUES (?,0)`,
        [category],
        (sqlTxn, res) => {
          console.log(`${category} todo added successfully`);
        },
        error => {
          console.log('error on adding category ' + error.message);
        },
      );
    });
  };
