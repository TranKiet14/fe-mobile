import { AntDesign, Ionicons } from "@expo/vector-icons"
import { useEffect, useState } from "react";
import { SafeAreaView, View, StyleSheet, Text, ScrollView, TouchableOpacity, Image } from "react-native"
import { getFood } from "../../service/foodService";

function FoodDetail({ navigation, route }) {
    const { food } = route.params

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.section_one}>
                <TouchableOpacity style={styles.icon_back} onPress={() => {
                    navigation.goBack()
                }}>
                    <Ionicons name="chevron-back-sharp" size={32} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.icon_back}>
                    <AntDesign name="delete" size={32} color="red" />
                </TouchableOpacity>
            </View>
            <ScrollView>
                {food && (
                    <>
                        <View style={styles.section_two}>
                            <Image style={{ height: "100%", width: "100%", resizeMode: "contain" }}
                                source={{ uri: food.thumbnail }}
                            />
                        </View>
                        <View style={styles.section_three}>
                            <Text style={{ fontSize: 32 }}>{food.name}</Text>
                        </View>
                        <View style={styles.section_four}>
                            <Text style={{ fontSize: 24 }}>Thông tin dinh dưỡng</Text>
                        </View>
                        <View style={styles.section_five}>
                            <View style={{ alignItems: "center", width: "88%", backgroundColor: "#fff", borderRadius: 15, paddingBottom: 20 }}>
                                <View>
                                    <Text style={{ fontSize: 24, fontWeight: 600, marginTop: 20 }}>Mỗi 100 gram</Text>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 20, justifyContent: "space-between", width: "80%" }}>
                                    <Text style={{ fontSize: 28, fontWeight: 500 }}>Calo</Text>
                                    <Text>
                                        <Text style={{ fontSize: 28, fontWeight: 500 }}>{food.caloriesPerUnit}</Text>
                                        <Text style={{ fontSize: 20, fontWeight: 200 }}>kcal</Text>
                                    </Text>
                                </View>
                                {food.proteinPerUnit && (
                                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 20, justifyContent: "space-between", width: "80%" }}>
                                        <Text style={{ fontSize: 28, fontWeight: 500 }}>Protein</Text>
                                        <Text>
                                            <Text style={{ fontSize: 28, fontWeight: 500 }}>{food.proteinPerUnit}</Text>
                                            <Text style={{ fontSize: 20, fontWeight: 200 }}>g</Text>
                                        </Text>
                                    </View>
                                )}

                                {food.carbonHydratePerUnit && (
                                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 20, justifyContent: "space-between", width: "80%" }}>
                                        <Text style={{ fontSize: 28, fontWeight: 500 }}>Carbohydrate</Text>
                                        <Text>
                                            <Text style={{ fontSize: 28, fontWeight: 500 }}>{food.carbonHydratePerUnit}</Text>
                                            <Text style={{ fontSize: 20, fontWeight: 200 }}>g</Text>
                                        </Text>
                                    </View>
                                )}
                                {food.fatPerUnit && (
                                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 20, justifyContent: "space-between", width: "80%" }}>
                                        <Text style={{ fontSize: 28, fontWeight: 500 }}>Chất béo</Text>
                                        <Text>
                                            <Text style={{ fontSize: 28, fontWeight: 500 }}>{food.fatPerUnit}</Text>
                                            <Text style={{ fontSize: 20, fontWeight: 200 }}>g</Text>
                                        </Text>
                                    </View>
                                )}
                                {food.fiberPerUnit && (
                                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 20, justifyContent: "space-between", width: "80%" }}>
                                        <Text style={{ fontSize: 28, fontWeight: 500 }}>Chất xơ</Text>
                                        <Text>
                                            <Text style={{ fontSize: 28, fontWeight: 500 }}>{food.fiberPerUnit}</Text>
                                            <Text style={{ fontSize: 20, fontWeight: 200 }}>g</Text>
                                        </Text>
                                    </View>
                                )}
                                {food.canxiPerUnit && (
                                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 20, justifyContent: "space-between", width: "80%" }}>
                                        <Text style={{ fontSize: 28, fontWeight: 500 }}>Canxi</Text>
                                        <Text>
                                            <Text style={{ fontSize: 28, fontWeight: 500 }}>{food.canxiPerUnit}</Text>
                                            <Text style={{ fontSize: 20, fontWeight: 200 }}>g</Text>
                                        </Text>
                                    </View>
                                )}
                            </View>
                        </View>
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F3F3F3',
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
        height: 200,
        width: "100%"
    },
    section_three: {
        height: 60,
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    section_four: {
        width: "100%",
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 15
    },
    section_five: {
        width: "100%",
        alignItems: "center"
    },
})
export default FoodDetail