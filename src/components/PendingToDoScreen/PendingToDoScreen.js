import React from 'react';
import { useSelector } from 'react-redux';
import Container from '../../EmotionComponents/Container';
import CustomButtonNavigate from '../../EmotionComponents/CustomButtonNavigate';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import ToDoItem from '../ToDo/ToDoItem/ToDoItem';

const PendingToDoScreen = () => {
    const todos = useSelector((state) =>
        state.todos.filter((todo) => todo.completed !== true)
    );
    return (
        <ScrollView>
            <FlatList style={styles.cardContainer}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    marginTop: 10,
                    paddingBottom: 50,
                }}
                keyExtractor={(item) => `${item._id}`}
                data={todos}
                renderItem={itemData =>
                    <ToDoItem todoData={itemData.item} id={itemData.item._id} state={false}></ToDoItem>
                }
            >
            </FlatList>
            <View style={styles.buttonHome}>
                <CustomButtonNavigate title='Home' task="Home" navigate='true' textColor='white' backgroundColor='#3b3b3b' />
            </View>
        </ScrollView>

    );
};
const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        width: '100%',
        padding: 5,
    },
    buttonHome:{
       justifyContent:'center',
       alignItems:'center'
    }

})
export default PendingToDoScreen;

