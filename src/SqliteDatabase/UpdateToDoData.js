import NavigationService from '../Services/NavigationService';
import { db } from './../../App';
export const UpdateToDoData=(props)=>{
    const {id,completed}=props;
    db.transaction((tx) => {
    tx.executeSql(
      'UPDATE todoList set completed=? where id=?',
      [completed,id],
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
