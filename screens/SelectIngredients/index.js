import { AntDesign, FontAwesome, Fontisto, Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, TouchableOpacity, Image, ScrollView, TextInput, StyleSheet, SafeAreaView, Keyboard } from 'react-native';
import { deleteIngredients, getListIngredients, getListIngredientsByUser } from '../../service/ingredientsService';
import AsyncStorage from '@react-native-async-storage/async-storage';

function SelectIngredients({ navigation, route }) {
    const { name } = route.params
    const [stateMenu, setStateMenu] = useState("default")
    const [selectedIngredients, setSelectedIngredients] = useState([])
    const [ingredients, setIngredients] = useState();
    const [ingredientsOfUser, setIngredientsOfUser] = useState();
    useEffect(() => {
        const fetchApi = async () => {
            const res = await getListIngredients();

            if (res) {
                setIngredients(res);
            }
        }
        fetchApi()
    }, [route])
    const fetchApiIngredientsByUser = async () => {
        let user
        try {
            const jsonValue = await AsyncStorage.getItem('userData');
            user = JSON.parse(jsonValue)
        } catch (error) {
            console.log(error)
        }
        const res = await getListIngredientsByUser(user._id);
        if (res) {
            setIngredientsOfUser(res);
        }
    }
    useEffect(() => {
        fetchApiIngredientsByUser()
    }, [route])
    useEffect(() => {
        const ingredient = route.params?.ingredient;
        const quantitative = route.params?.quantitative;
        const selectedId = selectedIngredients.length > 0 ? selectedIngredients.map(item => item.ingredient?._id) : []
        if (ingredient && !selectedId.includes(ingredient?._id)) {
            let newData = [
                ...selectedIngredients,
                {
                    ingredient: ingredient,
                    quantitative: quantitative
                }
            ]
            setSelectedIngredients(newData);
        } else if (ingredient && selectedId.includes(ingredient?._id)) {
            let newSelectedIngredient = selectedIngredients
            for (const item of newSelectedIngredient) {
                if (item.ingredient._id === ingredient._id) {
                    item.quantitative = quantitative
                }
            }
            setSelectedIngredients(newSelectedIngredient)
        }
    }, [route])
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.section_two}>
                <View style={{ width: "88%", height: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ fontSize: 28 }}>Chọn nguyên liệu</Text>
                    {selectedIngredients.length > 0 ? (
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('CookingDetail', {
                                name: name,
                                listIngredients: selectedIngredients
                            })
                        }}>
                            <AntDesign name="right" size={32} color="green" />
                        </TouchableOpacity>
                    ) : (
                        <AntDesign name="right" size={32} color="black" />
                    )}
                </View>
            </View>
            {/* <View style={styles.section_three}>
                <View style={styles.search_box}>
                    <AntDesign name="search1" size={24} color="#D8D8D8" />
                    <TextInput style={styles.input} placeholder="Tìm kiếm" onBlur={() => Keyboard.dismiss()} />
                </View>
            </View> */}
            <View style={styles.section_four}>
                <TouchableOpacity style={styles.itemMenu} onPress={() => setStateMenu("default")}>
                    {stateMenu === "default" ? (
                        <>
                            <Ionicons name="fast-food-outline" size={36} color="green" />
                            <Text style={{ fontWeight: 500, color: "green" }}>Mặc định</Text>
                        </>
                    ) : (
                        <>
                            <Ionicons name="fast-food-outline" size={36} color="#7C7777" />
                            <Text style={{ fontWeight: 500, color: "#7C7777" }}>Mặc định</Text>
                        </>
                    )}

                </TouchableOpacity>
                <TouchableOpacity style={styles.itemMenu} onPress={() => setStateMenu("note")}>
                    {stateMenu === "note" ? (
                        <>
                            <FontAwesome name="pencil-square-o" size={36} color="green" />
                            <Text style={{ fontWeight: 500, color: "green" }}>Nguyên liệu của tôi</Text>
                        </>
                    ) : (
                        <>
                            <FontAwesome name="pencil-square-o" size={36} color="#7C7777" />
                            <Text style={{ fontWeight: 500, color: "#7C7777" }}>Nguyên liệu của tôi</Text>
                        </>
                    )}
                </TouchableOpacity>
            </View>
            {stateMenu === "note" && (
                <>
                    <View style={styles.section_five}>
                        <ScrollView style={{ height: "65%" }}>
                            {ingredientsOfUser && ingredientsOfUser.map((item, index) => (
                                <TouchableOpacity key={index} style={{ flexDirection: "row", width: "100%", height: 60, backgroundColor: "#fff", borderBottomWidth: 2, borderColor: "#ddd" }}
                                    onPress={() => {
                                        navigation.navigate('AddIngredients', {
                                            ingredient: item,
                                            name: name
                                        })
                                    }} >
                                    <View style={{ width: "15%", height: "100%", marginLeft: 30 }}>
                                        <Image style={{ height: "100%", width: "100%", borderRadius: 15 }}
                                            source={{ uri: item?.thumbnail }}
                                        />
                                    </View>
                                    <View style={{ width: "50%", height: "100%", justifyContent: "center", }}>
                                        <View style={{ marginLeft: 20 }}>
                                            <Text style={{ fontSize: 20 }}>{item?.name}</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity style={styles.icon_back}>
                                        <AntDesign name="edit" size={32} color="black" onPress={() => {
                                            navigation.navigate("EditIngredient", {
                                                ingredient: item,
                                                name: name
                                            })
                                        }} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.icon_back}>
                                        <AntDesign name="delete" size={32} color="red" onPress={async () => {
                                            const res = await deleteIngredients(item._id);
                                            if (res.code === 200) {
                                                fetchApiIngredientsByUser()
                                            }
                                        }} />
                                    </TouchableOpacity>
                                </TouchableOpacity>
                            ))}

                        </ScrollView>
                        <TouchableOpacity style={styles.addButton} onPress={() => {
                            navigation.navigate('CreateIngredients', {
                                name: name
                            })
                        }}>
                            <Text style={styles.addButtonText}>Thêm nguyên liệu mới</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
            {stateMenu === "default" && (
                <>
                    <View style={styles.section_five}>
                        <ScrollView style={{ height: "65%" }}>
                            {ingredients && ingredients.map((item, index) => (
                                <View key={index}>
                                    <TouchableOpacity style={{ flexDirection: "row", width: "100%", height: 80, backgroundColor: "#fff", borderBottomWidth: 2, borderColor: "#ddd" }}
                                        onPress={() => {
                                            navigation.navigate('AddIngredients', {
                                                ingredient: item,
                                                name: name
                                            })
                                        }} >
                                        <View style={{ width: "20%", height: "100%", marginLeft: 30 }}>
                                            <Image style={{ height: "100%", width: "100%", borderRadius: 15 }}
                                                source={{ uri: item?.thumbnail }}
                                            />
                                        </View>
                                        <View style={{ width: "70%", height: "100%", justifyContent: "center", }}>
                                            <View style={{ marginLeft: 20 }}>
                                                <Text style={{ fontSize: 20 }}>{item?.name}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                </>
            )}
            {selectedIngredients.length > 0 && (
                <ScrollView horizontal={true} style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 100, width: "100%", backgroundColor: "#5EBD2F", paddingTop: 10, paddingLeft: 5 }}>
                    {selectedIngredients.map((item, index) => (
                        <TouchableOpacity key={index} onPress={() => {
                            const newSelectedIngredients = [...selectedIngredients]
                            setSelectedIngredients(newSelectedIngredients.filter((itemSelect) => itemSelect.ingredient._id !== item.ingredient._id))
                        }}>
                            <Image style={{ height: 50, width: 50, borderRadius: 50, marginHorizontal: 5 }}
                                source={{ uri: item.ingredient?.thumbnail }}
                            />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )}

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
        width: "50%",
        flexDirection: "column",
        alignItems: "center"
    },
    section_five: {
        width: "100%",
        alignItems: "center",
        marginBottom: 50
    },
    noteContainer: {
        width: "100%",
        borderTopWidth: 2,
        paddingTop: 50,
        marginTop: 10,
        borderTopColor: "#7C7777"
    },
    addButton: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        backgroundColor: '#5EBD2F',
        borderRadius: 5,
        width: "80%",
        alignItems: "center",
    },
    addButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
    }
});
export default SelectIngredients