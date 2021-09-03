import React from 'react';
import Container from '../../EmotionComponents/Container';
import CustomButtonNavigate from '../../EmotionComponents/CustomButtonNavigate';
import TodoList from '../ToDo/ToDoList/ToDoList';
import EStyleSheet from 'react-native-extended-stylesheet';
import { View } from 'react-native';
import { ScrollView } from 'react-native';
import AddTodoForm from '../ToDo/AddToDoForm/AddToDoForm';

const styles = EStyleSheet.create({
    scrollStyle: {
        backgroundColor: '#fff',
        flex:1
    },  
     toDoContainer: {
        height: 100,
        width:'90%',
        margin:'5%',
        justifyContent: 'center',
        alignItems: 'center'
    }
   
});

const DetailsScreen = () => {
    return (
        <ScrollView style={styles.scrollStyle}>
            <AddTodoForm></AddTodoForm>
            <TodoList></TodoList>
            <View style={styles.toDoContainer}>
                <CustomButtonNavigate title='Home' task="Home" navigate='true' textColor='#01d1e5' backgroundColor='lavenderblush' />
            </View>
      </ScrollView>
    );
};
 export default DetailsScreen;
