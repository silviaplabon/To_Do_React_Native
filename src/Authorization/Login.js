import React, { useEffect, useState } from 'react'
import { Button, Input, Image } from 'react-native-elements'
import { KeyboardAvoidingView, StyleSheet, View, Text } from 'react-native'
import Register from './Register'
import { useDispatch } from 'react-redux';
import { updateEmail, updateUsername } from '../components/Redux/Reducer/authReducer'

import { auth } from '../../firebase'
import NavigationService from '../Services/NavigationService';

const Login = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const profileLogo = "https://i.ibb.co/bdj8BSX/images-removebg-preview.png"
    const image = "https://i.pinimg.com/originals/4a/94/26/4a94268541d7a0ed95a8be5138e8a288.jpg"
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                dispatch(updateEmail(authUser.email));
                dispatch(updateUsername(authUser.displayName));
                NavigationService.navigate('HomeScreen')
            }
        })
        return unsubscribe
    }, [])

    const signIn = () => {
        auth.signInWithEmailAndPassword(email, password)
            .then()
            .catch((error) => alert(error))
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.inputContainer}>
                <Input
                    placeholder="Email"
                    autoFocus type="email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <Input
                    placeholder="Password" secureTextEntry type="password"
                    value={password}
                    onChangeText={pass => setPassword(pass)}
                    onSubmitEditing={signIn}
                />
            </View>
            <Button title="Login" titleStyle={{ color: 'white' }} type="outline" containerStyle={styles.authBtn} onPress={signIn} />
            <View style={{ height: 5 }}></View>
            <View style={styles.registerSection}>
                <Text > Don't have an account? </Text>
                <Button onPress={() => navigate('Register')} type="clear" titleStyle={{ color: 'black' }} title="SignUp" />
            </View>

        </KeyboardAvoidingView>
    )
}

export default Login;

const styles = StyleSheet.create({
    registerSection:{
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    authBtn: {
        width: 100,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#212729',
        borderRadius: 10,
        color: 'white'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white'
    },
    inputContainer: {
        width: '70%',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white'
    },
    loginBackground: {
        color:'black',
        width: '100%',
        paddingTop: 15,
        paddingBottom: 15,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    }
})
