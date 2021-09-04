import React from 'react';
import { View, Text, FlatList } from 'react-native';
import Subtitle from '../../../EmotionComponents/Subtitle';
import Title from '../../../EmotionComponents/Title';
import SettingsThemeDetails from '../SettingsThemeDetails/SettingsThemeDetails';
import SettingsThemeShow from '../SettingsThemeShow/SettingsThemeShow';
import Container from './../../../EmotionComponents/Container';
import { Colors } from 'react-native-paper';


const SettingsTheme = () => {

    const colors = [
        {
            id: 1,
            name:'Living Coral',
            color:'#FC766AFF'
        },
        {
            id: 2,
            name:'Turquoise ',
            color:'#42EADDFF'
        },
        {
            id: 3,
            name:'Blue',
            color:'#00A4CCFF'
        },
        {
            id: 4, 
            name:'Orange',
            color:'#F95700FF'
        },
        {
            id: 5,
            name:'Sailor Blue',
            color:'#00203FFF'
        },
        {
            id: 6,
            name:'Blazing Yellor',
            color:'#FEE715FF'
        },
        {
            id: 7,
            name:'Space Cherry',
            color:'#990011ff'
        },
        {
            id: 8, 
            name:'Dark Green',
            color:'#006b38ff'
        },
        {
            id: 9,
            name:'Deep Blue',
            color:'#2460A7FF'
        },
        {
            id: 10, 
            name:'Blue',
            color:'#011936FF'
        },

    ]


    return (
        <Container>
            <SettingsThemeShow state={1} colors={colors} type="Text Color"></SettingsThemeShow>
            <SettingsThemeShow state={2} colors={colors} type="Button Color"></SettingsThemeShow>
            <SettingsThemeShow state={3} colors={colors} type="Theme Color"></SettingsThemeShow>
            <SettingsThemeShow state={4} colors={colors} type="Drawer Color"></SettingsThemeShow>
        </Container>
    );
};

export default SettingsTheme;