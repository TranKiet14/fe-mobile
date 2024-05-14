import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function Profile({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.title}>Hồ Sơ</Text>
                </View>
                <TouchableOpacity onPress={() => {}}>
                    <Ionicons name="settings-outline" size={50} color="black" />
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.scrollView}>
                <TouchableOpacity style={styles.profileSection} onPress={() => {
                    navigation.navigate('Login')
                }}>
                    <Image
                        style={styles.profileImage}
                        source={{ uri: "https://c02.purpledshub.com/uploads/sites/48/2023/02/why-sky-blue-2db86ae.jpg?w=1029&webp=1" }}
                    />
                    <Text style={styles.loginText}>Đăng Nhập</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F3F3F3',
        minHeight: "100%"
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        backgroundColor: '#F3F3F3',
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 40,
        color: '#282119',
        fontWeight: 'bold',
        marginLeft: 20,
    },
    settingsIcon: {
        width: 40,
        height: 40,
        marginLeft: 'auto',
    },
    scrollView: {
        flex: 1,
        marginTop: 20,
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F3F3',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 10,
        marginLeft: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginRight: 20,
    },
    loginText: {
        fontSize: 32,
        marginLeft: 20
    }
});

export default Profile;
