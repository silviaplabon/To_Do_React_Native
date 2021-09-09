import { createAsyncThunk, createSlice, isAsyncThunkAction } from "@reduxjs/toolkit";
import { useState } from "react";
import { addTodoDatabase } from "../../../SqliteDatabase/AddTodoDatabase";
import { DeleteToDoData } from "../../../SqliteDatabase/DeleteToDoData";

const [todoData, setTodoData] = useState({})
// const [results,setResults]=useContext(ResultContext)

const initialState = [
    // { id: 1, title: 'todo1', completed: false },
    // { id: 2, title: 'todo2', completed: false },
    // { id: 3, title: 'todo3', completed: true },
]

export const getToDoAsync = createAsyncThunk(
    'todos/getTodosAsync',
    async (payload) => {
        const response = await fetch('https://quiet-cove-06317.herokuapp.com/all_ToDo_List?email=' + payload.email);
        console.log(response, "response from get to do async")
        if (response.ok) {
            const todos = await response.json();
            return { todos }
        }
        // else{
        //     let todos=results;
        //     return {todos};
        // }
    }
)

export const addToDoAsync = createAsyncThunk(
    'todos/addToDoAsync',
    async (payload) => {
        const response = await fetch(`https://quiet-cove-06317.herokuapp.com/add_To_Do`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: payload.id, sync: payload.sync, title: payload.title, syncTime: payload.syncTime, completed: payload.completed, email: payload.email })
        });

        if (response.ok) {
            const tododata = await response.json();
            const todo = tododata.ops[0];
            console.log(todo, "from to do reducer add to do async")
            return { todo }
        }

    }
)


export const toggleCompleteAsync = createAsyncThunk(
    'todos/toggleToDoAsync',
    async (payload) => {
        const response = await fetch(`https://quiet-cove-06317.herokuapp.coms/edit_To_Do/${payload._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ completed: payload.completed })
        });

        if (response.ok) {
            const todo = await response.json();
            return { todo }
        }
    }
)
export const deleteToDoAsync = createAsyncThunk(
    'todos/deleteToDoAsync',
    async (payload) => {
        const response = await fetch(`https://quiet-cove-06317.herokuapp.com/delete_To_Do/${payload._id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            const todo = await response.json();
            console.log("successfully deleted from db",todo);
            DeleteToDoData({_id:payload._id});
            const _id=payload._id;
            return {_id}
        }
    }
)


const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addToDo(state, action) {
            const newTodo = { _id: action.payload._id, id: action.payload.id, title: action.payload.title, completed: 0, email: action.payload.email, sync: action.payload.sync };
            state.push(newTodo)
        },
        getToDo(state, action) {
            const datas = [...action.payload[0]];
            return datas;
        },
        toggleComplete: (state, action) => {
            const index = state.findIndex(
                (todo) => todo._id === action.payload._id
            );
            state[index].completed = action.payload.completed;
        },
        deleteToDo: (state, action) => {
            return state.filter((todo) => todo._id !== action.payload._id)
        }

    },
    extraReducers: {
        [getToDoAsync.fulfilled]: (state, action) => {//after fulfilled
            console.log(action.payload.todos, "action payload data get to do async")
            return action.payload.todos;
        },
        [getToDoAsync.pending]: (state, action) => {//after rejected
            console.log('failed getting to do')
        },
        [addToDoAsync.fulfilled]: (state, action) => {//after fulfilled
            console.log(action.payload.todo);
            addTodoDatabase({
                _id: action.payload.todo._id,
                id: action.payload.todo.id,
                sync: action.payload.todo.sync,
                title: action.payload.todo.title,
                syncTime: action.payload.todo.syncTime,
                completed: action.payload.todo.completed,
                email: action.payload.todo.email,
            })
            state.push(action.payload.todo)
        },
        [deleteToDoAsync.fulfilled]: (state, action) => {//after fulfilled
            console.log(action.payload._id, "action payload from 111")
            return state.filter((todo) => todo._id !== action.payload._id)
        },


        [toggleCompleteAsync.fulfilled]: (state, action) => {
            const index = state.findIndex(
                (todo) => todo._id === action.payload.todo._id
            );
            state[index].completed = action.payload.todo.completed;
        },
    }
})
export const { addToDo, toggleComplete, deleteToDo, getToDo } = todoSlice.actions
export default todoSlice.reducer;