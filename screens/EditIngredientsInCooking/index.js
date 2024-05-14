import { AntDesign, FontAwesome6, Ionicons, MaterialIcons } from "@expo/vector-icons"
import { SafeAreaView, View, StyleSheet, Text, ScrollView, TouchableOpacity, Image, TextInput } from "react-native"
import { useEffect, useState } from "react";
import { getIngredient } from "../../service/ingredientsService";
function EditIngredientsInCooking({ navigation, route }) {
    const { ingredient, id } = route.params
    const [quantitative, setQuantitative] = useState(100);
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.section_one}>
                <TouchableOpacity style={styles.icon_back} onPress={() => {
                    navigation.goBack()
                }}>
                    <Ionicons name="chevron-back-sharp" size={32} color="black" />
                </TouchableOpacity>
                <View style={styles.icon_note}>
                    <TouchableOpacity>
                        <MaterialIcons name="star-border" size={32} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <MaterialIcons name="post-add" size={32} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView>
                {ingredient && (
                    <>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('IngredientsDetail', {
                                ingredient: ingredient
                            })
                        }} >
                            <View style={styles.section_two}>
                                <Image style={{ height: "100%", width: "100%", resizeMode: "contain" }}
                                    source={{ uri: ingredient.thumbnail }}
                                />
                            </View>
                            <View style={styles.section_three}>
                                <Text style={{ fontSize: 32, fontWeight: 500 }}>{ingredient.name}</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.section_four}>
                            <View style={{ backgroundColor: "#f9f9f9", padding: 20, borderRadius: 15 }}>
                                <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>Định lượng nguyên liệu</Text>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                    <View style={{ flexDirection: "row", alignItems: "center", height: 50, width: "75%", backgroundColor: "#fff", borderRadius: 15, paddingLeft: 20 }}>
                                        <TextInput value={quantitative} onChangeText={setQuantitative} style={{ fontSize: 18, }} keyboardType="numeric" placeholder="Định lượng" />
                                    </View>
                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", height: 50, width: 70, backgroundColor: "#fff", borderRadius: 15 }}>
                                        <Text style={{ fontSize: 18, }}>gram</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{ padding: 20 }}>
                            <TouchableOpacity style={styles.saveButton} onPress={() => {
                                navigation.navigate("EditCooking", {
                                    id: id,
                                    ingredient: ingredient,
                                    quantitative: quantitative
                                })
                            }}>
                                <Text style={styles.saveButtonText}>Lưu</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    )
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
    icon_note: {
        width: "24%",
        height: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly"
    },
    section_two: {
        height: 200,
        width: "100%"
    },
    section_three: {
        height: 60,
        width: "100%",
        paddingLeft: 30
    },
    section_four: {
        width: "100%",
        padding: 20,
    },
    addButton: {
        marginTop: 20,
        paddingHorizontal: 10,
        paddingVertical: 15,
        backgroundColor: '#fff',
        borderRadius: 15,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        borderColor: '#5EBD2F',
        borderWidth: 2,
        justifyContent: "space-between"
    },
    addButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#5EBD2F',
        width: "72%"
    },
    saveButton: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        backgroundColor: '#5EBD2F',
        borderRadius: 15,
        width: "100%",
        alignItems: "center"
    },
    saveButtonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
    }
})
export default EditIngredientsInCooking