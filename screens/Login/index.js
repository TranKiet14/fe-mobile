import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, TouchableOpacity, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';
import { login } from '../../service/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    // storeData = async () => {
    
    // };
    
    // storeData();
    // retrieveData();
    const handleSubmit = async () => {
        const res = await login({
            email: email,
            password: password
        })
        if (res.code === 200) {
            try {
                await AsyncStorage.setItem(
                    'userData',
                    JSON.stringify(res.user),
                );
                navigation.navigate("Profile")
            } catch (error) {
                // Error saving data
                console.log(error)
            }
        } else {
            setError("Sai email hoặc mật khẩu")
        }
    }
    return (

        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.content}>
                    <Text style={styles.title}>Đăng Nhập</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="example@ex.com"
                            keyboardType="email-address"
                            value={email}
                            onChangeText={setEmail}
                        />
                        <Text style={styles.label}>Mật khẩu</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="123456"
                            secureTextEntry={true}
                            value={password}
                            onChangeText={setPassword}
                        />
                        {error !== '' && (
                            <Text style={styles.error}>{error}</Text>
                        )}
                    </View>
                    <View style={styles.buttonContainer}>
                        <View style={{ backgroundColor: "red", width: "60%", backgroundColor: "#007AFF", borderRadius: 10 }}>
                            <Button
                                title="Đăng Nhập"
                                onPress={handleSubmit}
                                color="#fff"
                            />
                        </View>
                        <View style={styles.registerContainer}>
                            <Text style={styles.registerText}>Bạn Chưa Có Tài Khoản?</Text>
                            <TouchableOpacity onPress={() => {
                                navigation.navigate('Register')
                            }}>
                                <Text style={[styles.registerText, styles.bold]}>Đăng Ký</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inner: {
        padding: 24,
        flex: 1,
        justifyContent: 'space-around',
    },
    bgTop: {
        height: 60,
        // backgroundColor: 'blue', // Your background color for the top image
    },
    content: {
        flex: 1,
        paddingHorizontal: 30,
        marginTop: 200
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    inputContainer: {
        marginTop: 30,
    },
    label: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    error: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: "red"
    },
    input: {
        height: 48,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        paddingLeft: 10,
        fontSize: 24,
        marginBottom: 20,
    },
    buttonContainer: {
        marginTop: 20,
        flexDirection: "column",
        alignItems: "center"
    },
    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30,
    },
    registerText: {
        fontSize: 22,
    },
    bold: {
        fontWeight: 'bold',
        color: '#007AFF',
    },
    bgBottom: {
        height: 60,
        // backgroundColor: 'blue', // Your background color for the bottom image
    },
});

export default Login;
