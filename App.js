import React from 'react';
import { useEffect, useState } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { openDatabase,enablePromise } from 'react-native-sqlite-storage';
import { createTables } from './src/SqliteDatabase/CreateTables';
import MainStackScreen from './src/components/Route/MainStackScreen/MainStackScreen';
import { Provider } from 'react-redux';
import { store } from './src/components/Redux/Reducer/Store'
import { getToDoDatabase } from './src/SqliteDatabase/GetToDoDatabase';
import { getToDo } from './src/components/Redux/Reducer/ToDoReducer';

export const db = openDatabase({
  name: 'todoCollection',
});
enablePromise(true);

const App = () => {
  useEffect(() => {
    createTables()
  }, [])

  return (
    <Provider store={store}>
      <MainStackScreen></MainStackScreen>
    </Provider>
  );
};

export default App;
