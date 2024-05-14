import { AntDesign } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, TouchableOpacity, Image, ScrollView, TextInput, StyleSheet, SafeAreaView, Keyboard } from 'react-native';
import { getListCookings } from '../../service/cookingService';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Cooking({ navigation, route }) {
    const [cookings, setCookings] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            let user
            try {
                const jsonValue = await AsyncStorage.getItem('userData');
                user = JSON.parse(jsonValue)
            } catch (error) {
                console.log(error)
            }
            const res = await getListCookings(user._id);
            if (res) {
                setCookings(res);
            }
        }
        fetchApi()
    }, [route])
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.section_two}>
                <View style={{ width: "88%", height: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ fontSize: 28 }}>Công thức nấu ăn</Text>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('AddCooking')
                    }}>
                        <AntDesign name="plus" size={28} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
            {/* <View style={styles.section_three}>
                <View style={styles.search_box}>
                    <AntDesign name="search1" size={24} color="#D8D8D8" />
                    <TextInput style={styles.input} placeholder="Tìm kiếm" onBlur={() => Keyboard.dismiss()} />
                </View>
            </View> */}
            <View style={styles.section_five}>
                <ScrollView style={{ height: "85%" }}>
                    {cookings.length > 0 ? cookings.map((item, index) => (
                        <TouchableOpacity key={index} style={{ flexDirection: "row", width: "100%", height: 60, backgroundColor: "#fff", borderBottomWidth: 2, borderColor: "#ddd" }}
                            onPress={() => {
                                navigation.navigate('CookingManager', {
                                    id: item._id
                                })
                            }} >
                            <View style={{ width: "80%", height: "100%", justifyContent: "center", }}>
                                <View style={{ marginLeft: 20 }}>
                                    <Text style={{ fontSize: 20 }}>{item.name}</Text>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.icon_back}>
                                <AntDesign name="edit" size={32} color="black" onPress={() => { 
                                    navigation.navigate("EditCooking", {
                                        id: item._id
                                    })
                                 }} />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    )) : (
                        <Text style={{marginTop: 30, fontSize: 18}}>Bạn chưa có công thức nào</Text>
                    )}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        minHeight: "100%"
    },
    section_one: {
        flexDirection: "row",
        width: "100%",
        height: 40,
        alignItems: "center",
        justifyContent: "space-between"
    },
    icon_back: {
        width: "12%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    section_two: {
        width: "100%",
        height: 80,
        alignItems: "center",
        justifyContent: "center"
    },
    section_three: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    search_box: {
        width: "88%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F7F7F7",
        borderRadius: 8
    },
    input: {
        height: 36,
        borderRadius: 5,
        padding: 10,
        fontSize: 18,
        width: "90%"
    },
    section_four: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        marginTop: 20
    },
    itemMenu: {
        width: "24%",
        flexDirection: "column",
        alignItems: "center"
    },
    section_five: {
        width: "100%",
        alignItems: "center"
    },
    noteContainer: {
        width: "100%",
        borderTopWidth: 2,
        paddingTop: 50,
        marginTop: 10,
        borderTopColor: "#7C7777"
    }
});
export default Cooking