import { db } from './../../App';
export const createTables = () => {
    db.transaction(txn => {
      txn.executeSql(
        `CREATE TABLE IF NOT EXISTS ListToDo (_id VARCHAR(30), id  INTEGER PRIMARY KEY , syncTime int(30), title VARCHAR(25), completed int(1), email VARCHAR(30), sync int(1))`,
        [],
        (sqlTxn, res) => {
          console.log('table created successfully');
        },
        error => {
          console.log('error on creating table ' + error.message);
        },
      );
    });
  };