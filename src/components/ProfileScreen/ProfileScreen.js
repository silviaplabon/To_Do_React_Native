import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import Container from '../../EmotionComponents/Container';
import CustomButtonNavigate from '../../EmotionComponents/CustomButtonNavigate';
import AddTodoForm from '../ToDo/AddToDoForm/AddToDoForm';
import TodoList from '../ToDo/ToDoList/ToDoList';
import { useState, useEffect } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import GetToDoDatabase from '../../SqliteDatabase/GetToDoDatabase';
import { useDispatch, useSelector } from 'react-redux';


const styles = EStyleSheet.create({
    homeButton: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});


const ProfileScreen = () => {
    const dispatch = useDispatch();
    const themes = useSelector((state) => state.themes);
    return (
        <Container colorName={themes.themeBgColor} >
            <ScrollView>
                <GetToDoDatabase></GetToDoDatabase>
                <AddTodoForm></AddTodoForm>
                <TodoList></TodoList>
                <View style={styles.homeButton}>
                    <CustomButtonNavigate title='Home' task="Home" navigate='true' textColor={themes.textColor} backgroundColor={themes.buttonBgColor} />
                </View>
            </ScrollView>
        </Container>
    );
};

export default ProfileScreen;