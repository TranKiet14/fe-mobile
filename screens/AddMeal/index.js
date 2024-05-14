import { AntDesign, FontAwesome, Fontisto, Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, TouchableOpacity, Image, ScrollView, TextInput, StyleSheet, SafeAreaView, Keyboard } from 'react-native';
import { getListFoods } from '../../service/foodService';

function AddMeal({ navigation }) {
    const [stateMenu, setStateMenu] = useState("popular")
    const [foods, setFoods] = useState();
    useEffect(() => {
        const fetchApi = async () => {
            const res = await getListFoods();
            if (res) {
                setFoods(res);
            }
        }
        fetchApi()
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.section_one}>
                <TouchableOpacity style={styles.icon_back} onPress={() => {
                    navigation.goBack()
                }} >
                    <Ionicons name="chevron-back-sharp" size={32} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginRight: 10 }}>
                    <Text style={{ fontSize: 18, color: "green" }}>Xong</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.section_two}>
                <View style={{ width: "88%", height: "100%" }}>
                    <Text style={{ fontSize: 36 }}>Bữa sáng</Text>
                    <Text style={{ fontSize: 18, fontWeight: 400, color: "#979798" }}><Fontisto name="date" size={20} color="#979798" /> Thứ 2, 01/01/2024 <AntDesign name="clockcircleo" size={20} color="#979798" /> 8:00 AM</Text>
                </View>
            </View>
            <View style={styles.section_three}>
                <View style={styles.search_box}>
                    <AntDesign name="search1" size={24} color="#D8D8D8" />
                    <TextInput style={styles.input} placeholder="Tìm kiếm" onBlur={() => Keyboard.dismiss()} />
                </View>
            </View>
            <View style={styles.section_four}>
                <TouchableOpacity style={styles.itemMenu} onPress={() => setStateMenu("popular")}>
                    {stateMenu === "popular" ? (
                        <>
                            <Ionicons name="fast-food-outline" size={36} color="green" />
                            <Text style={{ fontWeight: 500, color: "green" }}>Phổ biến</Text>
                        </>
                    ) : (
                        <>
                            <Ionicons name="fast-food-outline" size={36} color="#7C7777" />
                            <Text style={{ fontWeight: 500, color: "#7C7777" }}>Phổ biến</Text>
                        </>
                    )}

                </TouchableOpacity>
                <TouchableOpacity style={styles.itemMenu} onPress={() => setStateMenu("note")}>
                    {stateMenu === "note" ? (
                        <>
                            <FontAwesome name="pencil-square-o" size={36} color="green" />
                            <Text style={{ fontWeight: 500, color: "green" }}>Thêm ghi chú</Text>
                        </>
                    ) : (
                        <>
                            <FontAwesome name="pencil-square-o" size={36} color="#7C7777" />
                            <Text style={{ fontWeight: 500, color: "#7C7777" }}>Thêm ghi chú</Text>
                        </>
                    )}
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemMenu} onPress={() => setStateMenu("favourite")} >
                    {stateMenu === "favourite" ? (
                        <>
                            <MaterialIcons name="star-border" size={36} color="green" />
                            <Text style={{ fontWeight: 500, color: "green" }}>Yêu thích</Text>
                        </>
                    ) : (
                        <>
                            <MaterialIcons name="star-border" size={36} color="#7C7777" />
                            <Text style={{ fontWeight: 500, color: "#7C7777" }}>Yêu thích</Text>
                        </>
                    )}

                </TouchableOpacity>
            </View>
            {stateMenu === "note" && (
                <View style={styles.noteContainer}>
                    <Text style={{ fontSize: 24, fontWeight: "bold", marginLeft: 30, marginBottom: 40 }}>Lưu ý</Text>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                        <View style={{ width: "80%" }}>
                            <Text style={{ fontSize: 18, fontWeight: "500", marginBottom: 20 }}>Thêm một ghi chú</Text>
                            <TextInput style={{ borderBottomWidth: 2, fontSize: 18 }} />
                        </View>
                    </View>
                </View>
            )}
            {stateMenu === "popular" && (
                <>
                    <View style={styles.section_five}>
                        <ScrollView style={{ height: "65%" }}>
                            {foods && foods.map((item, index) => (
                                <TouchableOpacity key={index} style={{ flexDirection: "row", width: "100%", height: 80, backgroundColor: "#fff", borderBottomWidth: 2, borderColor: "#ddd" }}
                                    onPress={() => {
                                        navigation.navigate('AddFood', {
                                            food: item
                                        })
                                    }} >
                                    <View style={{ width: "20%", height: "100%", marginLeft: 30 }}>
                                        <Image style={{ height: "100%", width: "100%", borderRadius: 15 }}
                                            source={{ uri: item.thumbnail }}
                                        />
                                    </View>
                                    <View style={{ width: "70%", height: "100%", justifyContent: "center", }}>
                                        <View style={{ marginLeft: 20 }}>
                                            <Text style={{ fontSize: 20 }}>{item.name}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </>
            )}
            {stateMenu === "favourite" && (
                <>
                    <View style={styles.section_five}>
                        <ScrollView style={{ height: "65%" }}>
                            <TouchableOpacity style={{ flexDirection: "row", width: "100%", height: 80, backgroundColor: "#fff", borderBottomWidth: 2, borderColor: "#ddd" }}
                                onPress={() => {
                                    navigation.navigate('AddFood')
                                }}>
                                <View style={{ width: "20%", height: "100%", marginLeft: 30 }}>
                                    <Image style={{ height: "100%", width: "100%", borderRadius: 15 }}
                                        source={{ uri: "data:image/jpeg;base64,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" }}
                                    />
                                </View>
                                <View style={{ width: "70%", height: "100%", justifyContent: "center" }}>
                                    <View style={{ marginLeft: 20 }}>
                                        <Text style={{ fontSize: 20 }}>Quả chuối</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flexDirection: "row", width: "100%", height: 80, backgroundColor: "#fff", borderBottomWidth: 2, borderColor: "#ddd" }}
                                onPress={() => {
                                    navigation.navigate('AddFood')
                                }}>
                                <View style={{ width: "20%", height: "100%", marginLeft: 30 }}>
                                    <Image style={{ height: "100%", width: "100%", borderRadius: 15 }}
                                        source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAPxHZ589tsdhN6NDFEZp4wv_RZFdIRcI5Cw&usqp=CAU" }}
                                    />
                                </View>
                                <View style={{ width: "70%", height: "100%", justifyContent: "center" }}>
                                    <View style={{ marginLeft: 20 }}>
                                        <Text style={{ fontSize: 20 }}>Cơm chiên</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flexDirection: "row", width: "100%", height: 80, backgroundColor: "#fff", borderBottomWidth: 2, borderColor: "#ddd" }}
                                onPress={() => {
                                    navigation.navigate('AddFood')
                                }}>
                                <View style={{ width: "20%", height: "100%", marginLeft: 30 }}>
                                    <Image style={{ height: "100%", width: "100%", borderRadius: 15 }}
                                        source={{ uri: "https://www.shutterstock.com/image-photo/hamburger-bun-isolated-on-white-600nw-2285508191.jpg" }}
                                    />
                                </View>
                                <View style={{ width: "70%", height: "100%", justifyContent: "center" }}>
                                    <View style={{ marginLeft: 20 }}>
                                        <Text style={{ fontSize: 20 }}>Bánh mì tròn</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </>
            )}
            <ScrollView horizontal={true} style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 100, width: "100%", backgroundColor: "#5EBD2F", paddingTop: 10, paddingLeft: 5 }}>
                <Image style={{ height: 50, width: 50, borderRadius: 50, marginHorizontal: 5 }}
                    source={{ uri: "https://info-imgs.vgcloud.vn/2022/01/07/15/hinh-anh-qua-trung-giu-ky-luc-nhieu-luot-yeu-thich-nhat-tren-instagram.jpg" }}
                />
                <Image style={{ height: 50, width: 50, borderRadius: 50, marginHorizontal: 5 }}
                    source={{ uri: "https://www.shutterstock.com/image-photo/hamburger-bun-isolated-on-white-600nw-2285508191.jpg" }}
                />
                <Image style={{ height: 50, width: 50, borderRadius: 50, marginHorizontal: 5 }}
                    source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3sOu14ghKYw-APsi8LYKBXlbDunx5OPRMug&usqp=CAU" }}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

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
        justifyContent: "center",
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

export default AddMeal;
