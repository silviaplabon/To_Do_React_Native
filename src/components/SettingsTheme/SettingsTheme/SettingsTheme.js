import React from 'react';
import { View, Text, FlatList } from 'react-native';
import Subtitle from '../../../EmotionComponents/Subtitle';
import Title from '../../../EmotionComponents/Title';
import SettingsThemeShow from '../SettingsThemeShow/SettingsThemeShow';
import Container from './../../../EmotionComponents/Container';


const SettingsTheme = () => {

    const color = [
        { id: 1, name: 'primary', textColor: '#6200EE', buttonBgColor: '#6200EE', themeBgColor:'black', drawerBgColor:'black'},
        { id: 2, name: 'secondary', textColor: '#000000', buttonBgColor: '#03DAc6',  themeBgColor:'black', drawerBgColor:'black' },
        { id: 3, name: 'danger', textColor: '#000000', buttonBgColor: '#B00020',  themeBgColor:'black', drawerBgColor:'black' },
        { id: 4, name: 'dark', textColor: '#000000', buttonBgColor: 'black' , themeBgColor:'black', drawerBgColor:'black'},
    ]


    return (
        <Container>
            <Title text="Please select a Text color" textColor="lavenderblush" />
            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    marginTop: 5,
                    paddingBottom: 5,
                }}
                numColumns={4}
                keyExtractor={(item) => `${item.id}`}
                data={color}
                renderItem={itemData =>
                    <SettingsThemeShow data={itemData.item.textColor}  title={itemData.item.name}  id={itemData.item.id} state={1}></SettingsThemeShow>
                }
            >
            </FlatList>
            <Title text="Please select a Theme color" textColor="lavenderblush" />
            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    marginTop: 5,
                    paddingBottom: 5,
                }}
                numColumns={4}
                keyExtractor={(item) => `${item.id}`}
                data={color}
                renderItem={itemData =>
                    <SettingsThemeShow data={itemData.item.themeBgColor}  title={itemData.item.name}  id={itemData.item.id} state={2} ></SettingsThemeShow>
                }
            >
            </FlatList>
            <Title text="Please select a Button color" textColor="lavenderblush" />
            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    marginTop: 5,
                    paddingBottom: 5,
                }}
                numColumns={4}
                keyExtractor={(item) => `${item.id}`}
                data={color}
                renderItem={itemData =>
                    <SettingsThemeShow data={itemData.item.buttonBgColor} title={itemData.item.name} id={itemData.item.id} state={3}></SettingsThemeShow>
                }
            >
            </FlatList>
            <Title text="Please select a Drawer color" textColor="lavenderblush" />
            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    marginTop: 5,
                    paddingBottom: 5,
                }}
                numColumns={4}
                keyExtractor={(item) => `${item.id}`}
                data={color}
                renderItem={itemData =>
                    <SettingsThemeShow data={itemData.item.drawerBgColor}  title={itemData.item.name}  id={itemData.item.id} state={4} ></SettingsThemeShow>
                }
            >
            </FlatList>
        </Container>
    );
};

export default SettingsTheme;