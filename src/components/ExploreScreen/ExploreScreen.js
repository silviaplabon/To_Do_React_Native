import React from 'react';
import Container from '../../EmotionComponents/Container';
import CustomButtonNavigate from '../../EmotionComponents/CustomButtonNavigate';
import TodoList from '../ToDo/ToDoList/ToDoList';
import EStyleSheet from 'react-native-extended-stylesheet';
import { View } from 'react-native';
import { ScrollView } from 'react-native';
import AddTodoForm from '../ToDo/AddToDoForm/AddToDoForm';
import { useDispatch, useSelector } from 'react-redux';

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
    const dispatch = useDispatch();
    const themes = useSelector((state) => state.themes);


    return (
        <Container colorName={themes.themeBgColor}>
        <ScrollView >
            <AddTodoForm></AddTodoForm>
            <TodoList></TodoList>
            <View style={styles.toDoContainer}>
                <CustomButtonNavigate title='Home' task="Home" navigate='true' textColor={themes.textColor} backgroundColor={themes.buttonBgColor}/>
            </View>
      </ScrollView>
      </Container>
    );
};
 export default DetailsScreen;
