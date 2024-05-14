import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Fontisto, Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { deleteCooking, getCooking } from "../../service/cookingService"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-elements';
import { useEffect, useState } from 'react';
function CookingManager({ navigation, route }) {
    const [disable, setDisable] = useState(false)
    const [cooking, setCooking] = useState();
    const { id } = route.params
    useEffect(() => {
        const fetchApi = async () => {
            const res = await getCooking(id);
            if (res) {
                setCooking(res);
            }
        }
        fetchApi()
    }, [route])
    const handleSubmit = async () => {
        setDisable(true)
        const res = await deleteCooking(id)
        if (res.code === 200) {
            navigation.navigate("Cooking", {
                status: "delete-success"
            })
        }
    }
    return (
        <SafeAreaView style={styles.container} >
            <ScrollView>
                <View style={styles.section_one}>
                    <TouchableOpacity style={styles.icon_back} >
                        <Ionicons name="chevron-back-sharp" size={32} color="black" onPress={() => {
                            navigation.goBack()
                        }} />
                    </TouchableOpacity>
                    <View style={styles.icon_back}>
                        <Button disabled={disable} buttonStyle={{ backgroundColor: "none" }} title={""} icon={<AntDesign name="delete" size={26} color="red" />} onPress={handleSubmit} />
                    </View>
                </View>
                {cooking && (
                    <View style={styles.section_two}>
                        <View style={{ width: "88%", height: "100%" }}>
                            <Text style={{ fontSize: 24 }}>Công thức: {cooking.name}</Text>
                        </View>
                    </View>
                )}
                <View style={styles.section_three}>
                    {cooking && cooking.listIngredients.map((item, index) => (
                        <TouchableOpacity key={index} style={{ flexDirection: "row", width: "88%", height: 100, backgroundColor: "#fff", borderRadius: 15, marginBottom: 10 }}
                            onPress={() => {
                                navigation.navigate("IngredientsDetail", {
                                    ingredient: item.ingredient
                                })
                            }} >
                            <View style={{ width: "33.3%", height: "100%", borderTopLeftRadius: 15, marginBottom: 10 }}>
                                <Image style={{ height: "100%", width: "100%", borderRadius: 15 }}
                                    source={{ uri: item.ingredient.thumbnail }}
                                />
                            </View>
                            <View style={{ width: "66.7%", height: "100%", justifyContent: "center" }}>
                                <View style={{}}>
                                    <Text style={{ fontSize: 28 }}>{item.ingredient.name}</Text>
                                    <Text style={{ fontSize: 18, fontWeight: 200 }}>{item.quantitative} {item.ingredient.unit}   {(item.ingredient.caloriesPerUnit / item.ingredient.amount * item.quantitative).toFixed(1)} kcal</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={styles.section_four}>
                    <Text style={{ fontSize: 32 }}>Thông tin dinh dưỡng</Text>
                </View>
                <View style={styles.section_five}>
                    {cooking && (
                        <View style={{ alignItems: "center", width: "88%", backgroundColor: "#fff", borderRadius: 15, paddingBottom: 20 }}>
                            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 20, justifyContent: "space-between", width: "80%" }}>
                                <Text style={{ fontSize: 28, fontWeight: 500 }}>Calo</Text>
                                <Text>
                                    <Text style={{ fontSize: 28, fontWeight: 500 }}>{cooking.listIngredients.reduce((total, item) => { return total + (((item.ingredient?.caloriesPerUnit / item.ingredient.amount) * item.quantitative) || 0) }, 0).toFixed(1)} </Text>
                                    <Text style={{ fontSize: 20, fontWeight: 200 }}>kcal</Text>
                                </Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 20, justifyContent: "space-between", width: "80%" }}>
                                <Text style={{ fontSize: 28, fontWeight: 500 }}>Protein</Text>
                                <Text>
                                    <Text style={{ fontSize: 28, fontWeight: 500 }}>{cooking.listIngredients.reduce((total, item) => { return total + (((item.ingredient?.proteinPerUnit / item.ingredient.amount) * item.quantitative) || 0) }, 0).toFixed(1)} </Text>
                                    <Text style={{ fontSize: 20, fontWeight: 200 }}>g</Text>
                                </Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 20, justifyContent: "space-between", width: "80%" }}>
                                <Text style={{ fontSize: 28, fontWeight: 500 }}>Carbohydrate</Text>
                                <Text>
                                    <Text style={{ fontSize: 28, fontWeight: 500 }}>{cooking.listIngredients.reduce((total, item) => { return total + (((item.ingredient?.carbonHydratePerUnit / item.ingredient.amount) * item.quantitative) || 0) }, 0).toFixed(1)} </Text>
                                    <Text style={{ fontSize: 20, fontWeight: 200 }}>g</Text>
                                </Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 20, justifyContent: "space-between", width: "80%" }}>
                                <Text style={{ fontSize: 28, fontWeight: 500 }}>Chất béo</Text>
                                <Text>
                                    <Text style={{ fontSize: 28, fontWeight: 500 }}>{cooking.listIngredients.reduce((total, item) => { return total + (((item.ingredient?.fatPerUnit / item.ingredient.amount) * item.quantitative) || 0) }, 0).toFixed(1)} </Text>
                                    <Text style={{ fontSize: 20, fontWeight: 200 }}>g</Text>
                                </Text>
                            </View>
                        </View>
                    )}
                </View>
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
        width: "100%",
        height: 80,
        alignItems: "center",
        justifyContent: "center"
    },
    section_three: {
        width: "100%",
        alignItems: "center"
    },
    section_four: {
        width: "100%",
        height: 80,
        alignItems: "center",
        justifyContent: "center"
    },
    section_five: {
        width: "100%",
        alignItems: "center"
    },
});
export default CookingManager