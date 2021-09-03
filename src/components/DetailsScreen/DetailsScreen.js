import React from 'react';
import Container from '../../EmotionComponents/Container';
import CustomButtonNavigate from '../../EmotionComponents/CustomButtonNavigate';
import TodoList from '../ToDo/ToDoList/ToDoList';

import { View } from 'react-native';



const DetailsScreen = () => {
    return (
      <View>
            <TodoList></TodoList>
          
        </View>
    );
};

export default DetailsScreen;
