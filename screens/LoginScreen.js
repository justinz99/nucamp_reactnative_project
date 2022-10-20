import React, { useEffect, useState } from "react"
import { View, Button, StyleSheet } from "react-native"
import { CheckBox, Input } from "react-native-elements"
import * as SecureStore from "expo-secure-store"

export default function LoginScreen() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [remember, setRemember] = useState(false)

    const handleLogin = () => {
        console.log('username: ' + username)
        console.log('password: ' + password)
        console.log('remember: ' + remember)
        if (remember) {
            SecureStore.setItemAsync(
                'userinfo', 
                JSON.stringify({
                    username,
                    password
                })
            ).catch(error => console.log('cannot save atm'))
        } else {
            SecureStore.deleteItemAsync('userinfo').catch(error => console.log('could not delete user info', error))
        }
    }

    useEffect(() => {
        SecureStore.getItemAsync('userinfo').then((userdata) => {
            const userinfo = JSON.parse(userdata)
            if (userinfo) {
                setUsername(userinfo.username)
                setPassword(userinfo.password)
                setRemember(true)
            }
        })
    }, [])

    return (
        <View style={styles.container} >
            <Input 
                placeholder="username"
                leftIcon= {{ type: 'font-awesome', name: 'user-o'}}
                onChangeText={text => setUsername(text)}
                value={username}
                containerStyle={styles.formInput}
                leftIconContainerStyle={styles.formIcon}
            />
            <Input 
                placeholder="password"
                leftIcon= {{ type: 'font-awesome', name: 'key'}}
                onChangeText={text => setPassword(text)}
                value={password}
                containerStyle={styles.formInput}
                leftIconContainerStyle={styles.formIcon }
            />
            <CheckBox
                title='remember me'
                center
                checked={remember}
                onPress={() => setRemember(!remember)}
                containerStyle={styles.formButton}
            />
            <View style={styles.formButton}
                title='login'
                color='#5637dd'
            >
                <Button 
                    onPress={() => handleLogin()}    
                    title='login'
                    color='#5637dd'
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20
    },
    formIcon: {
        marginRight: 10
    },
    formInput: {
        padding: 10,
    },
    formCheckbox: {
        margin: 10,
        backgroundColor: null
    },
    formButton: {
        margin: 40, 
    }
})