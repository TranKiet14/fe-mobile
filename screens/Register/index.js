import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';

function Register({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.bgTop}></View>
            <View style={styles.content}>
                <Text style={styles.title}>Đăng Ký</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="example@ex.com"
                        keyboardType="email-address"
                    />
                    <Text style={styles.label}>Mật khẩu</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="123456"
                        secureTextEntry={true}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <View style={{ backgroundColor: "red", width: "60%", backgroundColor: "#007AFF", borderRadius: 10 }}>
                        <Button
                            title="Đăng Ký"
                            onPress={() => console.log('Login button pressed')}
                            color="#fff"
                        />
                    </View>
                    <View style={styles.registerContainer}>
                        <Text style={styles.registerText}>Bạn Đã Có Tài Khoản?</Text>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('Login')
                        }}>
                            <Text style={[styles.registerText, styles.bold]}>Đăng Nhập</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.bgBottom}></View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bgTop: {
        height: 60,
        // backgroundColor: 'blue', // Your background color for the top image
    },
    content: {
        flex: 1,
        paddingHorizontal: 30,
        paddingTop: 20,
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

export default Register;
