import React, { useState } from 'react';
import styled, { css } from '@emotion/native'
import { View, Text, ImageBackground, Image, Button, TouchableOpacity } from 'react-native';
import CustomButtonNavigate from '../../EmotionComponents/CustomButtonNavigate';
import Title from '../../EmotionComponents/Title';
import Subtitle from '../../EmotionComponents/Subtitle';
import Container from '../../EmotionComponents/Container';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import NavigationService from '../../Services/NavigationService';


const image = "data:image/jpeg;base64,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"

const styles = EStyleSheet.create({
    homeButtonContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    imageStyle: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
});


const HomeScreen = () => {
    const dispatch = useDispatch();
    const themes = useSelector((state) => state.themes);
    const backgroundImage = { uri: 'https://images.unsplash.com/photo-1522199670076-2852f80289c3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dG9kb3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' };
    const addTaskImage = { uri: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.iconfinder.com%2Ficons%2F1046984%2Fadd_task_document_paper_plus_icon&psig=AOvVaw0lW8XMEF6EiwZBlbKMvNCp&ust=1630860649454000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCKCGhcXj5fICFQAAAAAdAAAAABAK' }
    return (
        <Container colorName={themes.themeBgColor}>
            <ImageBackground
                style={{ flex: 1, justifyContent: "center" }}
                source={backgroundImage}>
                <View style={{ marginTop: 120 }}>
                    <Title text="Extablish a Daily Habit" textColor="white" />
                    <Subtitle text="Get a clear view of the day ahead" textColor="white" />
                </View>

                <View style={styles.homeButtonContainer}>
                    <Image style={{ width: 250, height: 230, }}
                        source={{ uri: 'https://i.ibb.co/MP7zHR0/download-removebg-preview.png' }}
                    />
                    <View style={{ paddingRight: 50, marginTop: 0, paddingTop: 0,borderRadius:50 }}>
                        <TouchableOpacity onPress={() => NavigationService.navigate('AddToDoScreen')} style={[styles.touchableStyle, { backgroundColor: themes.buttonBgColor,borderRadius:50 }]}>
                            <Icon name="plus"
                                color='white'
                                size={40}
                
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </Container>
    );
};
export default HomeScreen;