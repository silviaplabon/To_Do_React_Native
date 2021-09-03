import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createIconSetFromFontello } from "react-native-vector-icons";
import { useState } from "react";
import { db } from './../../../../App';
const [todoData, setTodoData] = useState({})

const initialState = [
    // { id: 1, title: 'todo1', completed: false },
    // { id: 2, title: 'todo2', completed: false },
    // { id: 3, title: 'todo3', completed: true },
]

export const getToDoAsync = createAsyncThunk(
    'todos/getTodosAsync',
    async (payload) => {
        const todos = { ...action.payload };
        state=[];
        return { todos }
    }
)

export const toggleCompleteAsync = createAsyncThunk(
    'todos/toggleToDoAsync',
    // async (payload) => {
    //     const response = await fetch(`https://frozen-meadow-02730.herokuapp.com/edit_To_Do/${payload.id}`, {
    //         method: 'PATCH',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ completed: payload.completed })
    //     });

    //     if (response.ok) {
    //         const todo = await response.json();
    //         return { todo }
    //     }
    // }
)
export const deleteToDoAsync = createAsyncThunk(
    'todos/deleteToDoAsync',
    // async (payload) => {
    //     const response = await fetch(`https://frozen-meadow-02730.herokuapp.com/delete_To_Do/${payload.id}`, {
    //         method: 'DELETE',
    //     });
    //     if (response.ok) {
    //         const todo = await response.json();
    //         return { todo }
    //     }
    // }
    )


const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addToDo(state, action) {
            const newTodo = { id: action.payload.id, title: action.payload.title, completed: 0 };
            state.push(newTodo)
        },
        getToDo(state, action) {
            const datas =[...action.payload[0]] ;
            return datas;
        },
        toggleComplete: (state, action) => {
            const index = state.findIndex(
                (todo) => todo.id === action.payload.id
            );
            state[index].completed = action.payload.completed;
        },
        deleteToDo: (state, action) => {
            return state.filter((todo) => todo.id !== action.payload.id)
        }

    },
    extraReducers: {
        [getToDoAsync.fulfilled]: (state, action) => {//after fulfilled
            console.log(action.payload.todos, "action payload data")
            return action.payload.todos;
        },
        [getToDoAsync.pending]: (state, action) => {//after fulfilled
            console.log('failed')
        },

        [toggleCompleteAsync.fulfilled]: (state, action) => {
            const index = state.findIndex(
                (todo) => todo.id === action.payload.todo.id
            );
            state[index].completed = action.payload.todo.completed;
        },
    }
})
export const { addToDo, toggleComplete, deleteToDo, getToDo } = todoSlice.actions
export default todoSlice.reducer;