import { configureStore, } from '@reduxjs/toolkit'
import ToDoReducer from './ToDoReducer'
import authReducer from './authReducer'
import logger from 'redux-logger'
import ThemeReducer from './ThemeReducer'

export const store = configureStore({
    reducer:{
        todos:ToDoReducer,
        auth:authReducer,
        themes:ThemeReducer  


    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  })