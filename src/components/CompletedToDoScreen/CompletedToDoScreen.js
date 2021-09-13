import React from 'react';
import { useSelector } from 'react-redux';
import Container from '../../EmotionComponents/Container';
import CustomButtonNavigate from '../../EmotionComponents/CustomButtonNavigate';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import ToDoItem from '../ToDo/ToDoItem/ToDoItem';


const CompletedToDoScreen = (props) => {
    // const {name}=props.name;
    const todos = useSelector((state) =>
        state.todos.filter((todo) => todo.completed === true)
    );
    const themes = useSelector((state) => state.themes);
    
    return (
        <Container colorName={themes.themeBgColor}>
            <ScrollView>
                <FlatList style={styles.cardContainer}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        marginTop: 10,
                        paddingBottom: 50,
                    }}
                    keyExtractor={(item) => `${item.id}`}
                    data={todos}
                    renderItem={itemData =>
                        <ToDoItem todoData={itemData.item} id={itemData.item.id} state={false}></ToDoItem>
                    }
                >
                </FlatList>
                <View style={styles.buttonHome}>
                    <CustomButtonNavigate title='Home' task="Home" navigate='true' textColor={themes.textColor} backgroundColor={themes.buttonBgColor} />
                </View>
            </ScrollView>
        </Container>

    );
};
const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        width: '100%',
        padding: 5,
    },
    buttonHome: {
        justifyContent: 'center',
        alignItems: 'center'
    }

})
export default CompletedToDoScreen;

