import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useSelector } from 'react-redux';
import MainTabScreen from '../MainTabScreen/MainTabScreen';
import ProfileScreen from '../../ProfileScreen/ProfileScreen';
import ExploreScreen from '../../ExploreScreen/ExploreScreen';
import DrawerContent from '../../Route/DrawerContent/DrawerContent';
import { navigationRef } from '../RootNavigation/RootNavigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from '../../../Authorization/Register';
import Login from '../../../Authorization/Login';
import CompletedToDoScreen from '../../CompletedToDoScreen/CompletedToDoScreen';
import PendingToDoScreen from '../../PendingToDoScreen/PendingToDoScreen';
import { useEffect, useState } from 'react';
import HomeScreen from './../../HomeScreen/HomeScreen';
import { createContext } from 'react';
import NavigationService from '../../../Services/NavigationService';
import ThemeChanger from './../../SettingsTheme/ThemeChanger/ThemeChanger';
import EStyleSheet from 'react-native-extended-stylesheet';
import AddTodoForm from '../../ToDo/AddToDoForm/AddToDoForm';


const Drawer = createDrawerNavigator();
const RootStack = createNativeStackNavigator();


export const ToDoListContext = createContext();


export default function MainStackScreen() {
    const [results, setResults] = useState([]);

    const auth = useSelector((state) => state.auth);
    const themes = useSelector((state) => state.themes);
    useEffect(() => {
        EStyleSheet.build({
            $textColor: themes.textColor,
            $buttonColor: themes.buttonBgColor,
            $drawerColor: themes.drawerBgColor,
            $themeColor: themes.themeBgColor
        });
        console.log(themes.textColor,themes.buttonBgColor,themes.drawerBgColor,"app.js")
    }, [themes])




    return (
        <>
            {
                (!auth.username && !auth.email)
                    ?
                    <NavigationContainer ref={navigationRef}>
                        <RootStack.Navigator headerMode="none">
                            <RootStack.Screen name="Login" component={Login}></RootStack.Screen>
                            <RootStack.Screen name="Register" component={Register}></RootStack.Screen>
                        </RootStack.Navigator>
                    </NavigationContainer>
                    :
                    <ToDoListContext.Provider value={[results, setResults]}>
                        <NavigationContainer ref={navigatorRef => {
                            NavigationService.setTopLevelNavigator(navigatorRef);
                        }}>
                            <Drawer.Navigator drawerContent={props => <DrawerContent{...props} />}>
                                <Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
                                <Drawer.Screen name="HomeScreen" component={HomeScreen} />
                                <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
                                <Drawer.Screen name="Home" component={HomeScreen} />
                                <Drawer.Screen name="ExploreScreen" component={ExploreScreen} />
                                <Drawer.Screen name="AddToDoScreen" component={AddTodoForm} />
                                <Drawer.Screen name="CompletedScreen" component={CompletedToDoScreen} />
                                <Drawer.Screen name="PendingScreen" component={PendingToDoScreen} />
                                <Drawer.Screen name="ThemeChanger" component={ThemeChanger} />
                                <Drawer.Screen name="MainStackScreen" component={MainStackScreen} />
                            </Drawer.Navigator>
                        </NavigationContainer>
                    </ToDoListContext.Provider>
            }
        </>
    );
}

