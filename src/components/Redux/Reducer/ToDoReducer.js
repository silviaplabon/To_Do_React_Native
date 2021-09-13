import { createAsyncThunk, createSlice, isAsyncThunkAction } from "@reduxjs/toolkit";
import { useState } from "react";
import { addTodoDatabase } from "../../../SqliteDatabase/AddTodoDatabase";
import { DeleteToDoData } from "../../../SqliteDatabase/DeleteToDoData";
import { UpdateToDoData, UpdateToDoDataByID } from "../../../SqliteDatabase/UpdateToDoData";

import { db } from './../../../../App';


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

    }
)
/// at online , i am adding new to do at mongodb and after it done i am saving it at  local storage and  then redux
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
// at online , some element don't have  mongodb id(because of net connection during offline) so i am saving it at mongodb and then just update it at local storage and redux
export const addToDoUpdateAsync = createAsyncThunk(
    'todos/addToDoUpdateAsync',
    async (payload) => {
        console.log(payload.id, payload.title)
        const response = await fetch(`https://quiet-cove-06317.herokuapp.com/add_To_Do`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: payload.id, sync: 1, title: payload.title, syncTime: payload.syncTime, completed: payload.completed, email: payload.email })
        });

        if (response.ok) {
            const tododata = await response.json();
            const todo = tododata.ops[0];
            // UpdateToDoData({ _id: todo._id, completed: todo.completed,sync:todo.sync })
            console.log(todo, "from add to do update async")
            return { todo }
        }

    }
)

export const toggleCompleteAsync = createAsyncThunk(
    'todos/toggleCompleteAsync',
    async (payload) => {
        console.log(payload.completed, payload.sync, payload.id,payload._id, payload.state,"payload ")
        const response = await fetch(`https://quiet-cove-06317.herokuapp.com/edit_To_Do/${payload._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ completed: payload.completed })
        });

        if (response.ok) {
            console.log('updated todo from toggleCompleteAsync')
            const todos = await response.json();
            console.log(todos,"todos")
            const todo={ _id: payload._id, id:payload.id, completed: payload.completed, sync: payload.sync, state:payload.state }
            console.log(todo,"todo from toggle completed async")
            // UpdateToDoData({ _id: payload._id, completed: payload.completed, sync: 1 })
            return { todo}
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
            console.log("successfully deleted from db", todo);
            DeleteToDoData({ _id: payload._id });
            const _id = payload._id;
            return { _id }
        }
    }
)


const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addToDo(state, action) {
            addTodoDatabase({
                _id: action.payload._id,
                id: action.payload.id,
                sync: action.payload.sync,
                title: action.payload.title,
                syncTime: action.payload.syncTime,
                completed: action.payload.completed,
                email: action.payload.email,
            })
            const newTodo = {
                _id: action.payload._id,
                id: action.payload.id,
                sync: action.payload.sync,
                title: action.payload.title,
                syncTime: action.payload.syncTime,
                completed: action.payload.completed,
                email: action.payload.email,
            };
            console.log(newTodo, "new to do ")
            state.push(newTodo)

        },



        getToDo(state, action) {
            const datas = [...action.payload[0]];
            if (datas.length > 0) {
                return datas
            }
            else {
                const datas = []
                db.transaction(txn => {
                    txn.executeSql(
                        `SELECT * FROM ListToDo ORDER BY id DESC`,
                        [],
                        (sqlTxn, res) => {
                            console.log('Todos  retrieved successfully');
                            let len = res.rows.length;
                            if (len > 0 && results.length == 0) {
                                for (let i = 0; i < len; i++) {
                                    let item = res.rows.item(i);
                                    console.log(item)
                                    datas.push({ _id: item._id, id: item.id, sync: item.sync, title: item.title, syncTime: item.syncTime, completed: item.completed, email: item.email, });
                                }
                                return datas;
                            }
                        },
                        error => {
                            console.log('error on getting Todo ' + error.message);
                        },
                    );
                })
            }
            // return datas;
        },
        toggleComplete: (state, action) => {
            UpdateToDoData({ _id: action.payload._id, completed: action.payload.completed, sync: action.payload.sync })
            console.log('toggle complete data is executing')
            const index = state.findIndex(
                (todo) => todo._id === action.payload._id
            );
            state[index].completed = action.payload.completed;
            state[index].sync = action.payload.sync;
        },
        deleteToDo: (state, action) => {
            DeleteToDoData({ _id: action.payload._id })
            return state.filter((todo) => todo._id !== action.payload._id)
        },
        // handling delete operation when data is avaliable at mongodb. so, i am just assigning sync value=2. and update it to local db and redux.At online 
        deleteToDoWithDBId: (state, action) => {
            console.log(action.payload._id,action.payload.completed,action.payload.id)
            UpdateToDoDataByID({ _id: action.payload._id, completed: action.payload.completed, id: action.payload.id, sync: 2})
            return state.filter((todo) => todo.id !== action.payload.id)
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
        // If this request is fulfilled:: This data is already added to local storage and redux. So after adding it to mongodb then i am just updating redux state and local storage(_id and completed value)
        [addToDoUpdateAsync.fulfilled]: (state, action) => {//after fulfilled
            console.log(action.payload.todo, "action payload addtodoupdateasync");
            // const index = state.findIndex(
            //     (todo) => todo.id === action.payload.todo.id
            // );
            // state[index].completed = action.payload.todo.completed;
            // state[index]._id = action.payload.todo._id;
            // state[index].sync =1;
            console.log(action.payload.todo._id, action.payload.todo.completed, action.payload.todo.sync, action.payload.todo.id);
            UpdateToDoDataByID({ _id: action.payload.todo._id, completed: action.payload.todo.completed, id: action.payload.todo.id, sync: 1 })
        },
        [addToDoUpdateAsync.pending]: (state, action) => {//after rejected
            console.log('Add to do update async opetration is failed')
        },


        [deleteToDoAsync.fulfilled]: (state, action) => {//after fulfilled
            console.log(action.payload._id, "action payload from 111")
            return state.filter((todo) => todo._id !== action.payload._id)
        },
        [deleteToDoAsync.pending]: (state, action) => {
            console.log('failed delete to do async operation')
        },



        [toggleCompleteAsync.fulfilled]: (state, action) => {
            console.log(action.payload.todo,"action payloas todo state")
            // const index = state.findIndex(
            //     (data) => {
            //         data._id == action.payload.todo._id
            //     }
            // );

            // console.log(index,"index of todo ")

            // if(action.payload.todo.state==false){
            //     state[index].completed = action.payload.todo.completed;
            //     console.log(state[index].completed,"state index completed")
            // }
            // else{
            //     state[index].sync = action.payload.todo.sync;
            // }
        },
        [toggleCompleteAsync.pending]: (state, action) => {
            console.log('failed toggling')
        },
    }
})
export const { addToDo, toggleComplete, deleteToDo, getToDo,deleteToDoWithDBId } = todoSlice.actions
export default todoSlice.reducer;