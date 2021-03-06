import NavigationService from '../Services/NavigationService';
import { db } from './../../App';

export const  DeleteToDoData=(props)=>{

    const {_id}=props;
    db.transaction((tx) => {
    tx.executeSql(
      'DELETE FROM ListToDo where _id=?',
      [_id],
      (tx, results) => {
        console.log('Results', results.rowsAffected);
        if (results.rowsAffected > 0) {
         alert(
            'Success',
            'Todo deleted successfully',
            [
              {
                text: 'Ok',
                onPress: () => NavigationService.replace('ProfileScreen'),
              },
            ],
            { cancelable: false }
          );
        } else {
          alert('Please insert a valid todo Id');
        }
      }
    );
  })
}
