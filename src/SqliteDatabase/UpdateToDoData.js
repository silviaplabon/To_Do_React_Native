import NavigationService from '../Services/NavigationService';
import { db } from './../../App';

export const UpdateToDoData=(props)=>{
    const {_id,completed,sync}=props;
    console.log(props,"props for updaing data")
    db.transaction((tx) => {
    tx.executeSql(
      'UPDATE ListToDo set completed=?,sync=? where _id=?',
      [completed,sync,_id],
      (tx, results) => {
        console.log('Results', results.rowsAffected);
        if (results.rowsAffected > 0) {
          alert(
            'Success',
            'To do updated successfully',
            [
              {
                text: 'Ok',
                onPress: () => NavigationService.navigate('HomeScreen'),
              },
            ],
            { cancelable: false }
          );
        } else alert('Updation Failed');
      }
    );
  });
}


export const UpdateToDoDataByID=(props)=>{
  console.log(props,"updatetododatabyid")
  const {_id,completed,id,sync}=props;
  console.log(_id,completed,id,sync,"props id and completed id and sync")
  db.transaction((tx) => {
  tx.executeSql(
    'UPDATE ListToDo set completed=?, _id=?, sync=? where id=?',
    [completed,_id,sync,id],
    (tx, results) => {
      console.log('Results', results.rowsAffected);
      if (results.rowsAffected > 0) {
        alert(
          'Success',
          'To do updated  by mongodb id successfully',
          [
            {
              text: 'Ok',
              onPress: () => NavigationService.navigate('HomeScreen'),
            },
          ],
          { cancelable: false }
        );
      } else alert('Updation Failed');
    }
  );
});
}


