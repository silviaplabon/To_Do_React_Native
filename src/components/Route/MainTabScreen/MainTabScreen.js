import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import DetailsScreen from '../../DetailsScreen/DetailsScreen';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import ExploreScreen from '../../ExploreScreen/ExploreScreen';
import ProfileScreen from '../../ProfileScreen/ProfileScreen';
import HomeScreen from '../../HomeScreen/HomeScreen';

const Tab = createMaterialBottomTabNavigator();


const HomeStack = createNativeStackNavigator();
const DetailsStack = createNativeStackNavigator();

const MainTabScreen = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            activeColor="#fff"
            barStyle={{ backgroundColor: '#212729' }}
        >
            <Tab.Screen
                name="Home"
                component={HomeStackScreen}
                options={{
                    tabBarLabel: 'Home',
                    tapBarColor: '#212529',
                    tabBarIcon: ({ color }) => (
                        <Icon name="ios-home" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Notification"
                component={HomeDetailsScreen}
                options={{
                    tabBarLabel: 'Notifications',
                    tapBarColor: '#fff',
                    tabBarIcon: ({ color }) => (
                        <Icon name="ios-notifications" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tapBarColor: '#212729',
                    tabBarIcon: ({ color }) => (
                        <Icon name="ios-person" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Explore"
                component={ExploreScreen}
                options={{
                    tabBarLabel: 'Explore',
                    tapBarColor: 'red',
                    tabBarIcon: ({ color }) => (
                        <Icon name="ios-aperture" color={color} size={26} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
};

export default MainTabScreen;

const HomeStackScreen = ({ navigation }) => (
    <HomeStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#212729',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <HomeStack.Screen name="Home" component={HomeScreen}
            options={{
                title: 'Home', headerLeft: () => (
                    <Icon.Button name="ios-menu" size={35} backgroundColor="black"
                        onPress={() => navigation.openDrawer()}></Icon.Button>
                )
            }} />
        <HomeStack.Screen name="Details" component={DetailsScreen} options={{
            title: 'Details', headerLeft: () => (
                <Icon.Button name="ios-menu" size={35} backgroundColor="black"
                    onPress={() => navigation.openDrawer()}></Icon.Button>
            )
        }} />
    </HomeStack.Navigator>
);
const HomeDetailsScreen = ({ navigation }) => (
    <DetailsStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#212729',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <DetailsStack.Screen name="Details" component={DetailsScreen}
            options={{
                title: 'Details', headerLeft: () => (
                    <Icon.Button name="ios-menu" size={35} backgroundColor="black"
                        onPress={() => navigation.openDrawer()}></Icon.Button>
                )
            }} />
        <DetailsStack.Screen name="Home" component={HomeScreen}
            options={{
                title: 'Home', headerLeft: () => (
                    <Icon.Button name="ios-menu" size={35} backgroundColor="black"
                        onPress={() => navigation.openDrawer()}></Icon.Button>
                )
            }} />
    </DetailsStack.Navigator>
);
